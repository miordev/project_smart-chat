import { AIMessage, BaseMessage } from "@langchain/core/messages";
import { llmWithTools } from "./openai";
import { ToolName } from "./types";
import { toolsByName } from "./tools";

export const completion = async (
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
      const selectedTool = toolsByName[toolCall.name as ToolName];
      const toolMessage = await selectedTool.invoke(toolCall);
      history = [...history, toolMessage];
    }
    steps += 1;
  } while (steps < maxSteps);

  return new AIMessage(
    "I couldn't find a complete answer at this time. Please try rephrasing your question in a simpler way."
  );
};
