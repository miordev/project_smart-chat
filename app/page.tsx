import { Chat } from "@/components/chat";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen w-full h-full">
      <header className="flex flex-row gap-4 px-4 py-2 items-center bg-amber-500/10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <Image src="/youtube.svg" alt="AskTube logo" width={20} height={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">AskTube</h1>
          <p className="text-sm text-slate-600">
            Ask anything about any video!
          </p>
        </div>
      </header>
      <div className="flex-1 flex flex-row items-stretch bg-blue-50 overflow-hidden">
        <aside className="w-96 bg-purple-100">Sidebar</aside>
        <Chat className="flex-1 bg-green-100" />
      </div>
    </div>
  );
}
