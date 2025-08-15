"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PdfUploadDialog } from "@/components/pdf-upload-dialog";
import {
  AIMessage,
  HumanMessage,
  BaseMessage,
  SystemMessage,
  type MessagePayload,
} from "@/ai/types";
import { BubbleMessage } from "@/components/bubble-message";

type ChatProps = {
  className?: string;
};

export const Chat: React.FC<ChatProps> = ({ className }) => {
  const [messages, setMessages] = React.useState<BaseMessage[]>([]);
  const [input, setInput] = React.useState<string>("");
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }

    const userMessage = new HumanMessage(input);
    setInput("");
    const messagePayloads: MessagePayload[] = [...messages, userMessage].map(
      (message) => ({
        type: message.getType(),
        content: message.content.toString(),
      })
    );

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messagePayloads }),
    });
    const data = (await response.json()) as { content: string };
    const assistantMessage = new AIMessage(data.content);

    setMessages([...messages, userMessage, assistantMessage]);
  };

  const handleOnUploadSuccess = (documentId: string, documentName: string) => {
    const systemMessage = new SystemMessage({
      content: `A PDF document with ID "${documentId}" has been loaded into the vector store. You can now use the pdf-search tool to query its contents. Use this document ID when making RAG queries to ensure accurate document retrieval.`,
    });
    const iaMessage = new AIMessage({
      content: `You've successfully loaded "${documentName}". Feel free to ask me any questions about its contents - I'm here to help!`,
    });
    setMessages((prev) => [...prev, systemMessage, iaMessage]);
  };

  return (
    <main className={cn("flex flex-col gap-4", className)}>
      <div className="flex-1 flex flex-col gap-4 p-8 overflow-y-auto">
        {messages.map((message, index) => {
          return <BubbleMessage message={message} key={index} />;
        })}
      </div>

      <div className="flex flex-row gap-2 m-4">
        <PdfUploadDialog onUploadSuccess={handleOnUploadSuccess} />

        <form
          ref={formRef}
          onSubmit={handleOnSubmit}
          className="flex-1 flex items-end gap-2"
        >
          <Textarea
            name="input"
            value={input}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            placeholder="Ask me whatever you want"
            className="resize-none min-h-10 max-h-40 border-slate-700"
          />
          <Button
            disabled={!input.trim()}
            type="submit"
            variant="outline"
            className="flex items-center justify-center bg-slate-800"
          >
            <Send size={24} className="text-slate-50" />
          </Button>
        </form>
      </div>
    </main>
  );
};
