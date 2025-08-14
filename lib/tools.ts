import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

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

const youtubeTranscriptSchema = z.object({
  url: z
    .string()
    .describe(
      "YouTube video URL (e.g., 'https://www.youtube.com/watch?v=_yh410lA9yI')."
    ),
});

const youtubeTranscriptTool = tool(
  async ({ url }) => {
    try {
      const loader = YoutubeLoader.createFromUrl(url, {
        // TODO: Add language support
        // language: "en",
        // TODO: What is addVideoInfo?
        addVideoInfo: false,
      });
      console.log("URL: ", url);
      const docs = await loader.load();
      const text = docs
        .map((d) => d.pageContent)
        .join("\n\n")
        .trim();
      // console.log("text: ", text);
      return text.length ? text : "No transcript found for this video.";
    } catch (err: unknown) {
      return `Failed to load YouTube transcript: ${
        err instanceof Error ? err.message : String(err)
      }`;
    }
  },
  {
    name: "youtube_transcript",
    description:
      "Fetches the transcript text from a YouTube video. Use this to answer questions about the video's content.",
    schema: youtubeTranscriptSchema,
  }
);

export const toolsByName = {
  calculator: calculatorTool,
  youtube_transcript: youtubeTranscriptTool,
};
