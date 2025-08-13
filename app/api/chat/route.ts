import { llm } from "@/lib/llm";
import type { NextRequest } from "next/server";

// TODO: Add type for the request body
export async function POST(request: NextRequest) {
  const body = await request.json();

  const inputText = body.input;

  const completion = await llm.invoke(inputText);
  return Response.json({ content: completion.content });
}
