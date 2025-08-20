"use client";

import { signout } from "@/app/actions/auth";
import { Loader2, LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const LogoutDialog: React.FC = () => {
  const [state, action, pending] = React.useActionState(signout, {});
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    state.error = undefined;
  };

  const handleOnClose = () => {
    setOpen(false);
    state.error = undefined;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <LogOut size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? This will end your current session.
          </DialogDescription>
        </DialogHeader>
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        <DialogFooter className="flex flex-row justify-end items-end">
          <form action={action} className="flex flex-row gap-2">
            <Button variant="outline" type="button" onClick={handleOnClose}>
              Cancel
            </Button>
            <Button variant="destructive" type="submit" disabled={pending}>
              {pending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <LogOut size={16} />
              )}
              Logout
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
