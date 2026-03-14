"use client";

import React from "react";
import { Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleButtonProps {
  open: boolean;
  onClick: () => void;
}

function ToggleButton({ open, onClick }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-14 h-14 rounded-2xl",
        "bg-primary text-primary-foreground",
        "flex items-center justify-center",
        "shadow-lg shadow-primary/30",
        "transition-all duration-200 ease-out",
        "hover:scale-110 hover:shadow-xl hover:shadow-primary/40",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      aria-label={open ? "Close chat" : "Open AI chat assistant"}
      aria-expanded={open}
      aria-haspopup="dialog"
    >
      <Bot
        className={cn(
          "w-6 h-6 absolute transition-all duration-200",
          open ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0",
        )}
        aria-hidden="true"
      />
      <X
        className={cn(
          "w-6 h-6 absolute transition-all duration-200",
          open ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90",
        )}
        aria-hidden="true"
      />
      {!open && (
        <span
          className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export default React.memo(ToggleButton);