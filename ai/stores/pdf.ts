import { CharacterTextSplitter } from "@langchain/textsplitters";
import { createStore } from "./vector-store-registry";
import { Document } from "@langchain/core/documents";
import { DocumentId } from "../types";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const getPdfId = (file: File): DocumentId | null => {
  const cleanFilename = file.name.replace(/[^a-zA-Z]/g, "");

  if (cleanFilename.length === 0) {
    return null;
  }

  return cleanFilename;
};

const getDocumentsFromPdf = async (file: File): Promise<Document[]> => {
  const loader = new PDFLoader(file);
  const loadedDocuments = await loader.load();

  const splitter = new CharacterTextSplitter({
    separator: ". ",
    chunkSize: 2500,
    chunkOverlap: 200,
  });

  return await splitter.splitDocuments(loadedDocuments);
};

// TODO: Fix the types for the return value
export const loadPdfStore = async (
  file: File
): Promise<{ id: DocumentId; store: MemoryVectorStore }> => {
  if (file.type !== "application/pdf") {
    throw new Error("Invalid PDF file type");
  }

  const pdfId = getPdfId(file);
  console.log("pdfId", pdfId);
  if (!pdfId) {
    throw new Error("Invalid PDF filename");
  }

  const documents = await getDocumentsFromPdf(file);
  const newStore = await createStore(pdfId, documents);
  return { id: pdfId, store: newStore };
};
