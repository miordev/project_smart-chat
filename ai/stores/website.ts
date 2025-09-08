import { CharacterTextSplitter } from "@langchain/textsplitters";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { createStore, getStore } from "@/ai/stores/vector-store-registry";
import { Document } from "@langchain/core/documents";
import { LoadedStore, DocumentId } from "@/ai/types";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const getWebsiteId = (url: string): DocumentId | null => {
  const urlObject = new URL(url);

  const websiteId = `${urlObject.hostname}${urlObject.pathname}`;
  if (websiteId) {
    return `website-${websiteId}`;
  }

  return null;
};

const getDocumentsFromWebsite = async (url: string): Promise<Document[]> => {
  try {
    const loader = new CheerioWebBaseLoader(url);
    const loadedDocuments = await loader.load();
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 2500,
      chunkOverlap: 200,
    });

    return await splitter.splitDocuments(loadedDocuments);
  } catch {
    throw new Error("Error loading Website");
  }
};

export const loadWebsiteStore = async (url: string): Promise<LoadedStore> => {
  const websiteId = getWebsiteId(url);
  if (!websiteId) {
    throw new Error("Invalid Website URL");
  }

  const loadedStore = getStore(websiteId);
  if (loadedStore) {
    return { id: websiteId, store: loadedStore };
  }

  const documents = await getDocumentsFromWebsite(url);
  const newStore = await createStore(websiteId, documents);
  return { id: websiteId, store: newStore };
};

export const getWebsiteStore = (websiteId: DocumentId): MemoryVectorStore => {
  const loadedStore = getStore(websiteId);
  if (!loadedStore) {
    throw new Error("Website document not found");
  }
  return loadedStore;
};
