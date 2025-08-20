"use client";

import { cn } from "@/lib/utils";
import { BookOpenText, Bot } from "lucide-react";
import React from "react";
import { LogoutDialog } from "@/components/logout-dialog";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "flex flex-row gap-4 px-4 py-2 justify-between items-center bg-accent/50",
        className
      )}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr from-primary to-secondary">
        <Bot size={24} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-primary">Smart Chat</h1>
        <div className="flex flex-row gap-1 items-center">
          <p className="text-sm text-muted-foreground">Your personal AI</p>
          <BookOpenText size={16} className="text-primary" />
        </div>
      </div>
      <LogoutDialog />
    </header>
  );
};
