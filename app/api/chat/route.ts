import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { completion } from "@/ai/completion";
import { MessagePayload } from "@/app/types/definitions";
import type { NextRequest } from "next/server";

const toBaseMessage = (payload: MessagePayload): BaseMessage => {
  switch (payload.type) {
    case "human":
      return new HumanMessage(payload.content);
    case "ai":
      return new AIMessage(payload.content);
    default:
      throw new Error(`Unknown message type: ${payload.type}`);
  }
};

// TODO: Add type for the request body
// TODO: Summarize the conversation history (https://js.langchain.com/docs/concepts/chat_history/)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const messagePayloads = body.messagePayloads as MessagePayload[];
  const messages = messagePayloads.map(toBaseMessage);

  const aiMessage = await completion(messages);
  return Response.json({ content: aiMessage.content });
}
