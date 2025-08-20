import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[100dvh] w-full">
      <Header />
      <Separator />
      <Chat className="flex-1" />
    </div>
  );
}
