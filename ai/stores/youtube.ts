import { CharacterTextSplitter } from "@langchain/textsplitters";
import { createStore, getStore } from "@/ai/stores/vector-store-registry";
import { Document } from "@langchain/core/documents";
import { LoadedStore, DocumentId } from "@/ai/types";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

const getYoutubeId = (url: string): DocumentId | null => {
  const urlObject = new URL(url);

  // For videos with the format https://www.youtube.com/watch?v=VIDEO_ID
  const videoIdFromQueryParam = urlObject.searchParams.get("v");
  if (videoIdFromQueryParam) {
    return `youtube-${videoIdFromQueryParam}`;
  }

  // For videos with the format https://youtu.be/VIDEO_ID or https://www.youtube.com/shorts/VIDEO_ID
  const videoIdFromPathname = urlObject.pathname.split("/").at(-1);
  if (videoIdFromPathname) {
    return `youtube-${videoIdFromPathname}`;
  }

  return null;
};

const getDocumentsFromYoutube = async (url: string): Promise<Document[]> => {
  try {
    const loader = YoutubeLoader.createFromUrl(url, {
      addVideoInfo: true,
    });

    const loadedDocuments = await loader.load();
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 2500,
      chunkOverlap: 200,
    });

    return await splitter.splitDocuments(loadedDocuments);
  } catch {
    throw new Error("Error loading YouTube video");
  }
};

export const loadYoutubeStore = async (url: string): Promise<LoadedStore> => {
  const videoId = getYoutubeId(url);
  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  const loadedStore = getStore(videoId);
  if (loadedStore) {
    return { id: videoId, store: loadedStore };
  }

  const documents = await getDocumentsFromYoutube(url);
  const newStore = await createStore(videoId, documents);
  return { id: videoId, store: newStore };
};

export const getYoutubeStore = (videoId: DocumentId): MemoryVectorStore => {
  const loadedStore = getStore(videoId);
  if (!loadedStore) {
    throw new Error("YouTube document not found");
  }
  return loadedStore;
};
