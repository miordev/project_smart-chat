import { Document } from "@langchain/core/documents";
import { embeddings } from "../openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { DocumentId } from "../types";

const stores = new Map<DocumentId, MemoryVectorStore>();

export const getStore = (
  documentId: DocumentId
): MemoryVectorStore | undefined => {
  return stores.get(documentId);
};

export const createStore = async (
  documentId: DocumentId,
  documents: Document[]
): Promise<MemoryVectorStore> => {
  const newStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
  stores.set(documentId, newStore);
  return newStore;
};
