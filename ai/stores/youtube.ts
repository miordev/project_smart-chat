import { CharacterTextSplitter } from "@langchain/textsplitters";
import { createStore, getStore } from "./vector-store-registry";
import { Document } from "@langchain/core/documents";
import { DocumentId } from "../types";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

const getYoutubeVideoId = (videoUrl: string): DocumentId | null => {
  const url = new URL(videoUrl);

  // For videos with the format https://www.youtube.com/watch?v=VIDEO_ID
  const videoIdFromQueryParam = url.searchParams.get("v");
  if (videoIdFromQueryParam) {
    return videoIdFromQueryParam;
  }

  // For videos with the format https://youtu.be/VIDEO_ID or https://www.youtube.com/shorts/VIDEO_ID
  const videoIdFromPathname = url.pathname.split("/").at(-1);
  if (videoIdFromPathname) {
    return videoIdFromPathname;
  }

  return null;
};

const getDocumentsFromYoutubeVideo = async (
  videoUrl: string
): Promise<Document[]> => {
  try {
    const loader = YoutubeLoader.createFromUrl(videoUrl, {
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

export const loadYoutubeStore = async (
  videoUrl: string
): Promise<MemoryVectorStore> => {
  const videoId = getYoutubeVideoId(videoUrl);
  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  const loadedStore = getStore(videoId);
  if (loadedStore) {
    return loadedStore;
  }

  const documents = await getDocumentsFromYoutubeVideo(videoUrl);
  const newStore = await createStore(videoId, documents);
  return newStore;
};
