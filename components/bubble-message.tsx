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
    <div className="flex flex-row justify-end">
      <div className="flex flex-row gap-2 items-start max-w-4/5">
        <div className="min-w-0 flex-1 py-2 px-4 rounded-xl shadow-sm border-2 border-primary-foreground bg-primary">
          <p className="text-sm break-words text-primary-foreground">
            {content}
          </p>
        </div>
        <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-primary-foreground bg-primary">
          <User size={12} className="text-primary-foreground" />
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
    <div className="flex flex-row justify-start">
      <div className="flex flex-row gap-2 items-start max-w-4/5">
        <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-secondary-foreground bg-secondary">
          <Bot size={12} className="text-secondary-foreground" />
        </div>
        <div className="min-w-0 flex-1 py-2 px-4 rounded-xl shadow-sm border-2 border-secondary-foreground bg-secondary">
          <p className="text-sm break-words text-secondary-foreground">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};
