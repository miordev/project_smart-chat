import { calculatorTool } from "@/ai/tools/calculator";
import { pdfSearchTool } from "@/ai/tools/pdf-search";
import { StructuredToolInterface } from "@langchain/core/tools";
import { ToolName } from "@/ai/types";
import { youtubeSearchTool } from "@/ai/tools/youtube-search";
import { websiteSearchTool } from "@/ai/tools/website-search";

export const toolsByName: Record<ToolName, StructuredToolInterface> = {
  [ToolName.CALCULATOR]: calculatorTool,
  [ToolName.YOUTUBE_SEARCH]: youtubeSearchTool,
  [ToolName.WEBSITE_SEARCH]: websiteSearchTool,
  [ToolName.PDF_SEARCH]: pdfSearchTool,
};
