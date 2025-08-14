import { toolsByName } from "./tools";
import { llm } from "./openai";

export const llmWithTools = llm.bindTools(Object.values(toolsByName));
