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
      <div className="flex flex-row gap-2 items-start max-w-4/5">
        <div className="flex-1 py-2 px-4 rounded-xl shadow-sm border-2 border-primary-foreground bg-primary">
          <p className="text-sm break-all text-primary-foreground">{content}</p>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-primary-foreground bg-primary">
          <User size={16} className="text-primary-foreground" />
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
      <div className="flex flex-row gap-2 items-start max-w-3/4">
        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-secondary-foreground bg-secondary">
          <Bot size={16} className="text-secondary-foreground" />
        </div>
        <div className="flex-1 py-2 px-4 rounded-xl shadow-sm border-2 border-secondary-foreground bg-secondary">
          <p className="text-sm break-all text-secondary-foreground">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};
