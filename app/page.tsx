import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen w-full h-full">
      <Header />
      <Separator />
      <Chat className="flex-1" />
    </div>
  );
}
