import { cn } from "@/lib/utils";
import { BookOpenText, Bot } from "lucide-react";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "flex flex-row gap-4 px-4 py-2 justify-center items-center bg-accent/50",
        className
      )}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr from-primary to-secondary">
        <Bot size={24} />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-primary">
          Smart Chat Assistant
        </h1>
        <div className="flex flex-row gap-1 items-center">
          <p className="text-sm text-muted-foreground">
            Weaving knowledge from your content
          </p>
          <BookOpenText size={16} className="text-primary" />
        </div>
      </div>
    </header>
  );
};
