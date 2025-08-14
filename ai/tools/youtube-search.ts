import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { DocumentId, ToolName } from "@/ai/types";
import { getStore, createStore } from "@/ai/stores";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { tool } from "@langchain/core/tools";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { z } from "zod";

const youtubeSearchSchema = z.object({
  question: z.string().describe("A question about the video."),
  videoUrl: z.string().describe("YouTube URL of the video to search."),
});

const getYoutubeVideoId = (videoUrl: string): DocumentId | null => {
  const url = new URL(videoUrl);

  // For videos with the format https://www.youtube.com/watch?v=VIDEO_ID
  const videoIdFromQueryParam = url.searchParams.get("v");
  if (videoIdFromQueryParam) {
    return videoIdFromQueryParam;
  }

  // For videos with the format https://youtu.be/VIDEO_ID or https://www.youtube.com/shorts/VIDEO_ID
  const videoIdFromPathname = url.pathname.split("/").at(-1);
  if (videoIdFromPathname) {
    return videoIdFromPathname;
  }

  return null;
};

const documentsFromYoutubeVideo = async (
  videoUrl: string
): Promise<Document[]> => {
  try {
    const loader = YoutubeLoader.createFromUrl(videoUrl, {
      addVideoInfo: true,
    });

    const loadedDocs = await loader.load();
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 2500,
      chunkOverlap: 200,
    });

    return await splitter.splitDocuments(loadedDocs);
  } catch {
    throw new Error("Error loading YouTube video");
  }
};

const loadYoutubeVideoStore = async (
  videoUrl: string
): Promise<MemoryVectorStore> => {
  const videoId = getYoutubeVideoId(videoUrl);
  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  const loadedStore = getStore(videoId);
  if (loadedStore) {
    return loadedStore;
  }

  const documents = await documentsFromYoutubeVideo(videoUrl);
  const newStore = await createStore(videoId, documents);
  return newStore;
};

export const youtubeSearchTool = tool(
  async (input) => {
    try {
      const { question, videoUrl } = youtubeSearchSchema.parse(input);

      const videoId = getYoutubeVideoId(videoUrl);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }

      const store = await loadYoutubeVideoStore(videoUrl);
      const results = await store.similaritySearch(question);

      return `
        Answer the question based on the context provided. If you can't answer the question, just say that you don't know, do not try to make up an answer.
          - Question: ${question}
          - Context: ${results.map((r) => r.pageContent).join("\n")}
      `;
    } catch (err: unknown) {
      return `RAG retrieval failed: ${
        err instanceof Error ? err.message : String(err)
      }`;
    }
  },
  {
    name: ToolName.YOUTUBE_RAG_SEARCH,
    description:
      "Answers questions about an YouTube video by retrieving relevant transcript chunks from the vector store",
    schema: youtubeSearchSchema,
  }
);
