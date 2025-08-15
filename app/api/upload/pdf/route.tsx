import { loadPdfStore } from "@/ai/stores/pdf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  if (!(file instanceof File) || file.type !== "application/pdf") {
    return Response.json({ error: "File must be a PDF" }, { status: 400 });
  }

  try {
    const { id } = await loadPdfStore(file);
    return NextResponse.json(
      { message: "File uploaded", id, name: file.name },
      { status: 200 }
    );
  } catch {
    return Response.json({ error: "Error loading PDF" }, { status: 500 });
  }
}
