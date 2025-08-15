import { CharacterTextSplitter } from "@langchain/textsplitters";
import { createStore, getStore } from "./vector-store-registry";
import { Document } from "@langchain/core/documents";
import { DocumentId, LoadedStore } from "../types";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const getPdfId = (file: File): DocumentId | null => {
  const cleanFilename = file.name.replace(/[^a-zA-Z]/g, "");

  if (cleanFilename.length === 0) {
    return null;
  }

  return `pdf-${cleanFilename}`;
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

export const loadPdfStore = async (file: File): Promise<LoadedStore> => {
  if (file.type !== "application/pdf") {
    throw new Error("Invalid PDF file type");
  }

  const pdfId = getPdfId(file);
  if (!pdfId) {
    throw new Error("Invalid PDF filename");
  }

  const loadedStore = getStore(pdfId);
  if (loadedStore) {
    return { id: pdfId, store: loadedStore };
  }

  const documents = await getDocumentsFromPdf(file);
  const newStore = await createStore(pdfId, documents);
  return { id: pdfId, store: newStore };
};

export const getPdfStore = (pdfId: DocumentId): MemoryVectorStore => {
  const loadedStore = getStore(pdfId);
  if (!loadedStore) {
    throw new Error("PDF document not found");
  }
  return loadedStore;
};
