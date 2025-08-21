"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BookOpenText, Bot } from "lucide-react";
import { signin } from "@/app/actions/auth";

export default function HomePage() {
  const [state, action, pending] = React.useActionState(signin, {});

  return (
    <div className="flex h-[100dvh] justify-center items-center p-4 bg-accent/50">
      <div className="flex flex-col gap-6 w-full max-w-md rounded-lg p-4 sm:p-6 border bg-card">
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr from-primary to-secondary">
            <Bot size={24} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-primary">Smart Chat</h1>
            <div className="flex flex-row gap-1 items-center">
              <p className="text-sm text-muted-foreground">Weaving knowledge</p>
              <BookOpenText size={16} className="text-primary" />
            </div>
          </div>
        </div>

        <Separator />

        <form action={action} className="flex flex-col gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <Button type="submit" variant="default" disabled={pending}>
            Sign In
          </Button>

          <p className="text-sm text-center text-destructive">{state.error}</p>
        </form>
      </div>
    </div>
  );
}
