import { ToolName } from "../types";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { loadYoutubeStore } from "../stores";

const youtubeSearchSchema = z.object({
  question: z.string().describe("A question about the video."),
  videoUrl: z.string().describe("YouTube URL of the video to search."),
});

export const youtubeSearchTool = tool(
  async (input) => {
    try {
      const { question, videoUrl } = youtubeSearchSchema.parse(input);

      const store = await loadYoutubeStore(videoUrl);
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
