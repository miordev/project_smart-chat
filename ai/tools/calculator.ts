import { tool } from "@langchain/core/tools";
import { ToolName } from "../types";
import { z } from "zod";

const calculatorSchema = z.object({
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("The type of operation to execute."),
  number1: z.number().describe("The first number to operate on."),
  number2: z.number().describe("The second number to operate on."),
});

export const calculatorTool = tool(
  async (input) => {
    const { operation, number1, number2 } = calculatorSchema.parse(input);

    switch (operation) {
      case "add":
        return `${number1 + number2}`;
      case "subtract":
        return `${number1 - number2}`;
      case "multiply":
        return `${number1 * number2}`;
      case "divide":
        return `${number1 / number2}`;
      default:
        throw new Error("Invalid operation.");
    }
  },
  {
    name: ToolName.CALCULATOR,
    description: "Can perform mathematical operations.",
    schema: calculatorSchema,
  }
);
