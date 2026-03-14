"use client";

import React from "react";
import type { RefObject, KeyboardEvent } from "react";
import {
  AlertCircle,
  ArrowRight,
  Loader2,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { Message } from "./types";
import ChatMessage from "./chat-message";
import { SUGGESTED_QUESTIONS } from "./types";
import { Button } from "@/components/ui/button";

interface ChatWindowProps {
  botName: string;
  botSubtitle: string;
  messages: Message[];
  busy: boolean;
  hasError: boolean;
  draft: string;
  setDraft: (v: string) => void;
  send: (q?: string) => void;
  clearChat: () => void;
  onClose: () => void;
  onKey: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  bottomRef: RefObject<HTMLDivElement | null>;
  askedSuggestions: Set<string>;
}

function ChatWindow({
  botName,
  botSubtitle,
  messages,
  busy,
  hasError,
  draft,
  setDraft,
  send,
  clearChat,
  onClose,
  onKey,
  inputRef,
  bottomRef,
  askedSuggestions,
}: ChatWindowProps) {
  const remainingSuggestions = SUGGESTED_QUESTIONS.filter(
    (q) => !askedSuggestions.has(q),
  );

  const showSuggestions =
    remainingSuggestions.length > 0 &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant" &&
    messages[messages.length - 1].status === "done" &&
    !busy;

  return (
    <div
      className={cn(
        "flex flex-col",
        "w-[calc(100vw-3rem)] sm:w-[400px] max-w-[400px]",
        "h-[min(580px,calc(100vh-6rem))]",
        "rounded-2xl overflow-hidden",
        "border border-border/60",
        "bg-background",
        "shadow-2xl shadow-black/15 dark:shadow-black/70",
        "animate-in slide-in-from-bottom-4 fade-in-0 duration-300 ease-out",
      )}
      role="dialog"
      aria-label={`Chat with ${botName}`}
      aria-modal="false"
    >
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="relative px-4 py-3.5 border-b border-border/60 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        {/* Decorative top-right glow */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar with ring */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary/15 dark:bg-primary/25 ring-1 ring-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background"
                aria-label="Online"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {botName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[11px] text-muted-foreground">{botSubtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              onClick={clearChat}
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              onClick={onClose}
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Messages ─────────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          "px-4 py-4 space-y-5",
          "[&::-webkit-scrollbar]:w-1",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-thumb]:bg-border/50",
        )}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((m) => (
          <ChatMessage key={m.id} msg={m} />
        ))}

        {/* ── Suggested questions ──────────────────────────────────────────── */}
        {showSuggestions && (
          <div className="pl-8 space-y-2">
            {/* Label that makes affordance obvious */}
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-3 h-3 text-primary/60" />
              <span className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider">
                Quick questions — tap to ask
              </span>
            </div>

            {/* Chips */}
            <div className="flex flex-col gap-1.5">
              {remainingSuggestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className={cn(
                    "group cursor-pointer",
                    "flex items-center justify-between gap-2",
                    "text-left text-[12px] font-medium",
                    "px-3.5 py-2.5 rounded-xl",
                    // Left accent bar
                    "border-l-2 border-l-primary/40 border border-border/50",
                    "hover:border-l-primary hover:border-primary/20",
                    "text-foreground/80 hover:text-primary",
                    "bg-muted/40 hover:bg-primary/8",
                    "transition-all duration-150 ease-out",
                    "active:scale-[0.98]",
                  )}
                >
                  <span className="leading-snug">{q}</span>
                  {/* Arrow always visible — clear CTA */}
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Error banner ─────────────────────────────────────────────────────── */}
      {hasError && (
        <div
          className="mx-3 mb-2 flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-destructive bg-destructive/10 border border-destructive/20"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Unable to reach the AI. Is your Flowise instance running?</span>
        </div>
      )}

      {/* ── Input row ────────────────────────────────────────────────────────── */}
      <div className="p-3 border-t border-border/60 bg-muted/10">
        <div
          className={cn(
            "flex items-end gap-2",
            "px-3 py-2 rounded-xl",
            "border border-border/60",
            "bg-background",
            "focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20",
            "transition-all duration-150",
          )}
        >
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${Math.min(e.target.scrollHeight, 104)}px`;
            }}
            onKeyDown={onKey}
            placeholder="Ask me anything… (Enter to send)"
            rows={1}
            disabled={busy}
            className={cn(
              "flex-1 resize-none bg-transparent text-sm",
              "text-foreground placeholder:text-muted-foreground/50",
              "border-0 outline-none ring-0 focus:ring-0",
              "min-h-[34px] max-h-[104px] py-1.5 leading-snug",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            aria-label="Type your message"
            aria-multiline="true"
          />

          <Button
            size="icon"
            className={cn(
              "h-8 w-8 shrink-0 rounded-lg mb-0.5",
              "transition-all duration-150",
              "disabled:opacity-30",
            )}
            onClick={() => send()}
            disabled={!draft.trim() || busy}
            aria-label={busy ? "Sending…" : "Send message"}
          >
            {busy ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/40 mt-2">
          Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}

export default React.memo(ChatWindow);
