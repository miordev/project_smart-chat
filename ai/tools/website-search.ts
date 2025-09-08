import { ToolName } from "@/ai/types";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { loadWebsiteStore } from "@/ai/stores";

const websiteSearchSchema = z.object({
  question: z.string().describe("A question about the website."),
  websiteUrl: z.string().describe("Website URL of the website to search."),
});

export const websiteSearchTool = tool(
  async (input) => {
    try {
      const { question, websiteUrl } = websiteSearchSchema.parse(input);

      const { store } = await loadWebsiteStore(websiteUrl);
      const results = await store.similaritySearch(question);

      return `
        Answer the question based on the context provided. If you can't answer the question, just say that you don't know, do not try to make up an answer.
          - Question: ${question}
          - Context: ${results.map((r) => r.pageContent).join("\n")}
      `;
    } catch (err: unknown) {
      return `Website RAG failed: ${
        err instanceof Error ? err.message : String(err)
      }`;
    }
  },
  {
    name: ToolName.WEBSITE_SEARCH,
    description:
      "Answers questions about an website by retrieving relevant content from the vector store",
    schema: websiteSearchSchema,
  }
);
