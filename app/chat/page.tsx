import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-dvh max-w-dvw overflow-hidden">
      <Header />
      <Separator />
      <Chat className="flex-1" />
    </div>
  );
}
