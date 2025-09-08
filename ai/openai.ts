import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { toolsByName } from "@/ai/tools";

export const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

export const llmWithTools = llm.bindTools(Object.values(toolsByName));

export const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-large",
});
