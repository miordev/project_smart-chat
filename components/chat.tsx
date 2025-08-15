"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bot, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AIMessage,
  HumanMessage,
  BaseMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { MessagePayload } from "@/app/types/definitions";
import { PdfUploadDialog } from "@/components/pdf-upload-dialog";

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

    setInput("");
    const userMessage = new HumanMessage(input);
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

  const handlePdfUploaded = (documentId: string) => {
    const systemMessage = new SystemMessage({
      content: `PDF document "${documentId}" has been loaded. You can now ask questions about its contents.`,
    });
    setMessages((prev) => [...prev, systemMessage]);
  };

  return (
    <main className={cn("flex flex-col gap-4", className)}>
      <div className="flex-1 flex flex-col gap-4 p-8 overflow-y-auto">
        {messages.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </div>

      <div className="flex flex-row gap-2 m-4">
        <PdfUploadDialog onUploadSuccess={handlePdfUploaded} />

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

type MessageProps = {
  message: BaseMessage;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const isHuman = message.getType() === "human";
  const isAssistant = message.getType() === "ai";

  if (isHuman) {
    return <UserMessage content={message.content.toString()} />;
  }
  if (isAssistant) {
    return <AssistantMessage content={message.content.toString()} />;
  }
  return null;
};

type UserMessageProps = {
  content: string;
};

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <div className="flex flex-row justify-end w-full">
      <div className="flex flex-row gap-2 items-center max-w-1/2">
        <div className="flex-1 py-2 px-4 rounded-lg bg-slate-800">
          <p className="text-sm text-slate-50">{content}</p>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800">
          <User size={24} className="text-slate-50" />
        </div>
      </div>
    </div>
  );
};

type AssistantMessageProps = {
  content: string;
};

const AssistantMessage: React.FC<AssistantMessageProps> = ({ content }) => {
  return (
    <div className="flex flex-row justify-start w-full">
      <div className="flex flex-row gap-2 items-center max-w-1/2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50">
          <Bot size={24} className="text-slate-800" />
        </div>
        <div className="flex-1 py-2 px-4 rounded-lg bg-slate-50">
          <p className="text-sm text-slate-800">{content}</p>
        </div>
      </div>
    </div>
  );
};
