import { MessagePayload } from "@/app/types/definitions";
import { llmWithTools } from "@/lib/llm";
import { toolsByName } from "@/lib/tools";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
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

const getCompletion = async (
  messages: BaseMessage[],
  maxSteps = 3
): Promise<AIMessage> => {
  let steps = 0;
  let history = [...messages];

  do {
    const aiMessage = await llmWithTools.invoke(history);

    // If the AI message doesn't have any tool calls, return it
    if (!aiMessage.tool_calls || aiMessage.tool_calls.length === 0) {
      return aiMessage;
    }

    // If the AI message has tool calls, add it to the history and call the tools
    history = [...history, aiMessage];
    for (const toolCall of aiMessage.tool_calls) {
      const selectedTool =
        toolsByName[toolCall.name as keyof typeof toolsByName];
      const toolMessage = await selectedTool.invoke(toolCall);
      history = [...history, toolMessage];
    }
    steps += 1;
  } while (steps < maxSteps);

  return new AIMessage("Reached tool call limit without final answer.");
};

// TODO: Add type for the request body
// TODO: Summarize the conversation history (https://js.langchain.com/docs/concepts/chat_history/)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const messagePayloads = body.messagePayloads as MessagePayload[];
  const messages = messagePayloads.map(toBaseMessage);

  const aiMessage = await getCompletion(messages);
  return Response.json({ content: aiMessage.content });
}
