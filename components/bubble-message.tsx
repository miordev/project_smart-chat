"use client";

import { Bot, User } from "lucide-react";
import { BaseMessage } from "@/ai/types";

type BubbleMessageProps = {
  message: BaseMessage;
};

export const BubbleMessage: React.FC<BubbleMessageProps> = ({ message }) => {
  const isHuman = message.getType() === "human";
  const isAssistant = message.getType() === "ai";

  if (isHuman) {
    return <BubbleHumanMessage content={message.content.toString()} />;
  }
  if (isAssistant) {
    return <BubbleAiMessage content={message.content.toString()} />;
  }
  return null;
};

type BubbleHumanMessageProps = {
  content: string;
};

const BubbleHumanMessage: React.FC<BubbleHumanMessageProps> = ({ content }) => {
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

type BubbleAiMessageProps = {
  content: string;
};

const BubbleAiMessage: React.FC<BubbleAiMessageProps> = ({ content }) => {
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
