import { MessageType } from "@langchain/core/messages";

export type MessagePayload = { type: MessageType; content: string };
