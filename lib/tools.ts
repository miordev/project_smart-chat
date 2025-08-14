import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import {
  ingestYoutubeVideo,
  getYoutubeVideoId,
  isVideoIndexed,
  retrieveFromVideo,
  getLastVideoId,
  query,
} from "@/lib/rag";

const calculatorSchema = z.object({
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("The type of operation to execute."),
  number1: z.number().describe("The first number to operate on."),
  number2: z.number().describe("The second number to operate on."),
});

const calculatorTool = tool(
  async ({ operation, number1, number2 }) => {
    // Functions must return strings
    if (operation === "add") {
      return `${number1 + number2}`;
    } else if (operation === "subtract") {
      return `${number1 - number2}`;
    } else if (operation === "multiply") {
      return `${number1 * number2}`;
    } else if (operation === "divide") {
      return `${number1 / number2}`;
    } else {
      throw new Error("Invalid operation.");
    }
  },
  {
    name: "calculator",
    description: "Can perform mathematical operations.",
    schema: calculatorSchema,
  }
);

const youtubeRagSearchSchema = z.object({
  question: z.string().describe("A question about the video."),
  url: z.string().describe("YouTube URL of the video to search."),
});

/**
 * Retrieves relevant chunks from the already indexed video and returns context for answering.
 * If a URL is provided and that video is not indexed, this tool will NOT re-fetch automatically.
 */
const youtubeRagSearchTool = tool(
  async ({ question, url }) => {
    console.log("HOLA", {
      question,
      url,
    });
    try {
      const results = await query(url, question, 5);
      console.log("results", results);
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
    name: "youtube_rag_search",
    description:
      "Answers questions about an YouTube video by retrieving relevant transcript chunks from the vector store",
    schema: youtubeRagSearchSchema,
  }
);

export const toolsByName = {
  calculator: calculatorTool,
  // youtube_transcript: youtubeTranscriptTool,
  youtube_rag_search: youtubeRagSearchTool,
};
