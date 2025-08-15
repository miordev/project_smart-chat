import { MessageType } from "@langchain/core/messages";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

export enum ToolName {
  CALCULATOR = "calculator",
  YOUTUBE_SEARCH = "youtube_search",
  PDF_SEARCH = "pdf_search",
}

export type DocumentId = string;

export type LoadedStore = {
  id: DocumentId;
  store: MemoryVectorStore;
};

export type MessagePayload = { type: MessageType; content: string };
