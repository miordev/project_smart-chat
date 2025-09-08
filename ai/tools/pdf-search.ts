import { getStore } from "@/ai/stores";
import { tool } from "@langchain/core/tools";
import { ToolName } from "@/ai/types";
import { z } from "zod";

const pdfSearchSchema = z.object({
  question: z.string().describe("A question about the PDF document."),
  documentId: z.string().describe("The ID of the uploaded PDF document."),
});

export const pdfSearchTool = tool(
  async (input) => {
    try {
      const { question, documentId } = pdfSearchSchema.parse(input);

      const store = getStore(documentId);
      if (!store) {
        return `PDF document with ID "${documentId}" not found. Please upload the PDF first.`;
      }

      const results = await store.similaritySearch(question);

      return `
        Answer the question based on the context provided from the PDF document. If you can't answer the question, just say that you don't know, do not try to make up an answer.
          - Question: ${question}
          - Context: ${results.map((r) => r.pageContent).join("\n")}
      `;
    } catch (err: unknown) {
      return `PDF RAG failed: ${
        err instanceof Error ? err.message : String(err)
      }`;
    }
  },
  {
    name: ToolName.PDF_SEARCH,
    description:
      "Answers questions about an uploaded PDF document by retrieving relevant chunks from the vector store",
    schema: pdfSearchSchema,
  }
);
