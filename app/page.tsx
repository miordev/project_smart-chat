import { Chat } from "@/components/chat";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen w-full h-full">
      <Header />
      <div className="flex-1 flex flex-row items-stretch bg-blue-50 overflow-hidden">
        <aside className="w-96 bg-purple-100">Sidebar</aside>
        <Chat className="flex-1 bg-green-100" />
      </div>
    </div>
  );
}
