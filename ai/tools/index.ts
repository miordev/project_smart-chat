import { calculatorTool } from "./calculator";
import { StructuredToolInterface } from "@langchain/core/tools";
import { ToolName } from "../types";
import { youtubeSearchTool } from "./youtube-search";
import { pdfSearchTool } from "./pdf-search";

export const toolsByName: Record<ToolName, StructuredToolInterface> = {
  [ToolName.CALCULATOR]: calculatorTool,
  [ToolName.YOUTUBE_RAG_SEARCH]: youtubeSearchTool,
  [ToolName.PDF_RAG_SEARCH]: pdfSearchTool,
};
