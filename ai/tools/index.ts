import { calculatorTool } from "./calculator";
import { pdfSearchTool } from "./pdf-search";
import { StructuredToolInterface } from "@langchain/core/tools";
import { ToolName } from "../types";
import { youtubeSearchTool } from "./youtube-search";

export const toolsByName: Record<ToolName, StructuredToolInterface> = {
  [ToolName.CALCULATOR]: calculatorTool,
  [ToolName.YOUTUBE_SEARCH]: youtubeSearchTool,
  [ToolName.PDF_SEARCH]: pdfSearchTool,
};
