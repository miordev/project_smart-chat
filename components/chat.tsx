"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const mockMessages: Message[] = [
  {
    role: "user",
    content:
      "What is this YouTube video about? https://www.youtube.com/watch?v=XqZsoesa55w",
  },
  {
    role: "assistant",
    content:
      "It's the Baby Shark Dance by Pinkfong—a children's song with simple, repeatable dance moves.",
  },
  {
    role: "user",
    content: "Who is the target audience?",
  },
  {
    role: "assistant",
    content:
      "Primarily toddlers and young children, but it's family-friendly for everyone.",
  },
  {
    role: "user",
    content: "How long is it?",
  },
  {
    role: "assistant",
    content: "About two minutes long, short and easy for kids to follow.",
  },
  {
    role: "user",
    content: "Why is it so catchy?",
  },
  {
    role: "assistant",
    content:
      "Repetition, simple melody, predictable structure, and actions that match the words.",
  },
  {
    role: "user",
    content: "What are the main dance moves?",
  },
  {
    role: "assistant",
    content:
      "Hand chomps for shark jaws, swimming arms, sneaking motions, and a 'run away' move.",
  },
  {
    role: "user",
    content: "Is it educational at all?",
  },
  {
    role: "assistant",
    content:
      "It helps with coordination, following instructions, vocabulary for family members, and rhythm.",
  },
  {
    role: "user",
    content: "What are the lyrics like?",
  },
  {
    role: "assistant",
    content:
      "Very repetitive: 'Baby shark, doo-doo-doo…' introducing baby, mommy, daddy, grandma, grandpa shark.",
  },
  {
    role: "user",
    content: "Is it safe and appropriate for kids?",
  },
  {
    role: "assistant",
    content:
      "Yes—clean content. Just keep screen time balanced and the volume at a comfortable level.",
  },
  {
    role: "user",
    content: "How popular is this video?",
  },
  {
    role: "assistant",
    content:
      "Extremely—billions of views globally, it became a meme and even charted in some countries.",
  },
  {
    role: "user",
    content: "Which channel uploaded it?",
  },
  {
    role: "assistant",
    content: "Pinkfong—on the official Pinkfong Kids' Songs & Stories channel.",
  },
  {
    role: "user",
    content: "Can I watch it with subtitles?",
  },
  {
    role: "assistant",
    content:
      "Yes—YouTube captions are available, and there are versions in multiple languages.",
  },
  {
    role: "user",
    content: "What else can we watch if my kid likes this?",
  },
  {
    role: "assistant",
    content:
      "More Pinkfong songs and channels like Super Simple Songs or Cocomelon with similar dance-alongs.",
  },
  {
    role: "user",
    content: "Any downsides or controversies?",
  },
  {
    role: "assistant",
    content:
      "Mainly overuse and screen-time concerns; some found it annoying due to repetition—moderation helps.",
  },
  {
    role: "user",
    content: "How do I keep my kid engaged while watching?",
  },
  {
    role: "assistant",
    content:
      "Model the moves, clap along, pause to repeat sections, and turn it into a movement activity.",
  },
  {
    role: "user",
    content: "Does it include the whole shark family?",
  },
  {
    role: "assistant",
    content:
      "Yes—baby, mommy, daddy, grandma, and grandpa shark appear in sequence.",
  },
  {
    role: "user",
    content: "Summarize the video in one sentence.",
  },
  {
    role: "assistant",
    content:
      "A simple, upbeat dance-along introducing the shark family with repetitive 'doo-doo-doo' lyrics and matching actions.",
  },
];

type ChatProps = {
  className?: string;
};

export const Chat: React.FC<ChatProps> = ({ className }) => {
  const [messages, setMessages] = React.useState<Message[]>(mockMessages);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setMessages((_messages) => [
  //       ..._messages,
  //       { role: "assistant", content: "This is a test message 2" },
  //     ]);
  //   }, 1000);

  //   setTimeout(() => {
  //     setMessages((_messages) => [
  //       ..._messages,
  //       { role: "assistant", content: "This is a test message 3" },
  //     ]);
  //   }, 2000);

  //   setTimeout(() => {
  //     setMessages((_messages) => [
  //       ..._messages,
  //       { role: "assistant", content: "This is a test message 4" },
  //     ]);
  //   }, 3000);

  //   // const fetchResponse = async () => {
  //   //   const response = await fetch("/api/chat", {
  //   //     method: "POST",
  //   //     body: JSON.stringify({
  //   //       input:
  //   //         "What is this YouTube video about? https://www.youtube.com/watch?v=XqZsoesa55w",
  //   //     }),
  //   //   });
  //   //   const data = await response.json();
  //   //   console.log("data", data);
  //   //   setMessages(data.content);
  //   // };
  //   // fetchResponse();
  // }, []);

  return (
    <main className={cn("flex flex-col gap-4 p-4 overflow-y-auto", className)}>
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        return isUser ? (
          <UserMessage content={message.content} key={index} />
        ) : (
          <AssistantMessage content={message.content} key={index} />
        );
      })}
    </main>
  );
};

type UserMessageProps = {
  content: string;
};

const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <div className="flex flex-row justify-end w-full">
      <div className="flex flex-row gap-2 items-center max-w-1/2">
        <div className="flex-1 py-2 px-4 rounded-lg bg-slate-800">
          <p className="text-sm text-slate-50">{content}</p>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-800">
          <User size={20} className="text-slate-50" />
        </div>
      </div>
    </div>
  );
};

type AssistantMessageProps = {
  content: string;
};

const AssistantMessage: React.FC<AssistantMessageProps> = ({ content }) => {
  return (
    <div className="flex flex-row justify-start w-full">
      <div className="flex flex-row gap-2 items-center max-w-1/2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-50">
          <Bot size={20} className="text-slate-800" />
        </div>
        <div className="flex-1 py-2 px-4 rounded-lg bg-slate-50">
          <p className="text-sm text-slate-800">{content}</p>
        </div>
      </div>
    </div>
  );
};
