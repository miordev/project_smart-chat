import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { embeddings } from "@/lib/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

type VideoId = string;
const stores = new Map<VideoId, MemoryVectorStore>();

const getYoutubeVideoId = (videoUrl: string): VideoId | null => {
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

const docsFromYoutubeVideo = async (videoUrl: string): Promise<Document[]> => {
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

export const query = async (videoUrl: string, query: string, k = 4) => {
  const videoId = getYoutubeVideoId(videoUrl);
  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  const loadedStore = stores.get(videoId);
  if (loadedStore) {
    return loadedStore.similaritySearch(query, k);
  }

  const documents = await docsFromYoutubeVideo(videoUrl);
  const newStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
  stores.set(videoId, newStore);
  return newStore.similaritySearch(query, k);
};
