"use client";

import React from "react";
import { Bot, User, AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { fmtTime } from "./helper";
import type { Message } from "./types";
import { TypingIndicator } from "./typing-indicator";

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div
      className={cn(
        "group flex gap-2 items-end",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "shrink-0 flex items-center justify-center",
          "w-6 h-6 rounded-lg mb-0.5",
          isUser ? "bg-primary/15 dark:bg-primary/25" : "bg-muted",
        )}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </div>

      <div className="relative max-w-[78%]">
        <div
          className={cn(
            "px-3.5 py-2.5 text-sm leading-relaxed",
            isUser
              ? [
                  "bg-primary text-primary-foreground",
                  "rounded-2xl rounded-br-[4px]",
                ]
              : [
                  "bg-muted text-foreground",
                  "rounded-2xl rounded-bl-[4px]",
                  msg.status === "error" &&
                    "!bg-destructive/10 !text-destructive border border-destructive/20",
                ],
          )}
        >
          {msg.status === "streaming" ? (
            <TypingIndicator />
          ) : (
            <span className="whitespace-pre-wrap break-words">
              {msg.status === "error" && (
                <AlertCircle className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
              )}
              {msg.content}
            </span>
          )}
        </div>

        <span
          className={cn(
            "absolute -bottom-5 text-[10px] text-muted-foreground/50 whitespace-nowrap",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            isUser ? "right-0" : "left-0",
          )}
        >
          {fmtTime(msg.timestamp)}
        </span>
      </div>
    </div>
  );
}

export default React.memo(ChatMessage);
