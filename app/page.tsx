import { Chat } from "@/components/chat";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen w-full h-full">
      <Header />
      <Chat className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" />
    </div>
  );
}
