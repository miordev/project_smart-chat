import { ChatOpenAI } from "@langchain/openai";
import { toolsByName } from "./tools";

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

export const llmWithTools = llm.bindTools(Object.values(toolsByName));
