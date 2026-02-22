"use client";

/**
 * Chatbot — Flowise-powered AI chat widget
 *
 * Calls the Flowise REST API directly — no extra npm packages required.
 * Handles both streaming (SSE) and standard JSON responses automatically.
 * Automatically adapts to your site's light/dark mode via next-themes.
 *
 * ─── Installation ────────────────────────────────────────────────────────────
 * No new dependencies needed — uses packages already in this project:
 *   next-themes, lucide-react, @/components/ui/button, @/lib/utils
 *
 * Optional (alternative embed approach — see bottom of file for notes):
 *   npm install flowise-embed-react
 *
 * ─── Usage ───────────────────────────────────────────────────────────────────
 * In app/layout.tsx (inside <ThemeProvider>):
 *
 *   import { Chatbot } from "@/components/chatbot";
 *
 *   <Chatbot
 *     chatflowId={process.env.NEXT_PUBLIC_FLOWISE_CHATFLOW_ID!}
 *     apiHost={process.env.NEXT_PUBLIC_FLOWISE_API_HOST!}
 *   />
 *
 * ─── Flowise Environment Variables ──────────────────────────────────────────
 * Add to .env.local:
 *   NEXT_PUBLIC_FLOWISE_CHATFLOW_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *   NEXT_PUBLIC_FLOWISE_API_HOST=https://flowise.yourdomain.com
 *   NEXT_PUBLIC_FLOWISE_API_KEY=your-api-key   # optional — if auth enabled
 */

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  /** "streaming" renders animated typing dots; "error" applies error styling */
  status: "streaming" | "done" | "error";
}

export interface ChatbotProps {
  /** Flowise chatflow ID — copy from Dashboard → Chatflow → API Endpoint */
  chatflowId: string;
  /** Base URL of your Flowise instance — no trailing slash
   *  e.g. "https://flowise.yourdomain.com" */
  apiHost: string;
  /** Opening message shown before the user types anything */
  welcomeMessage?: string;
  /** Anchor corner for the floating widget */
  position?: "bottom-right" | "bottom-left";
  /**
   * Force a specific dark-mode state.
   * Leave undefined to auto-detect from next-themes (recommended).
   */
  isDarkMode?: boolean;
  /** Flowise API key — required only if your instance has auth enabled */
  apiKey?: string;
  /** Display name shown in the chat header */
  botName?: string;
  /** Short subtitle shown below the bot name */
  botSubtitle?: string;
  /**
   * Auto-open the chat window on first page load.
   * Uses sessionStorage so it only fires once per browser session.
   * Default: true
   */
  autoOpen?: boolean;
}

// ─── Suggested questions ──────────────────────────────────────────────────────

/** Shown as clickable chips before the user types their first message */
const SUGGESTED_QUESTIONS = [
  "What are Veang's key skills?",
  "Tell me about Veang's projects",
  "How can I contact Veang?",
] as const;

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

/** Collision-resistant micro-ID — no external dependency needed */
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const fmtTime = (d: Date) =>
  d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ─── TypingIndicator ─────────────────────────────────────────────────────────

/**
 * Three bouncing dots shown while the bot is generating a response.
 * Delays are staggered so they cascade rather than bounce in sync.
 */
function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-[4px] py-0.5 px-0.5"
      aria-label="AI is typing"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-[6px] h-[6px] rounded-full bg-muted-foreground/50 animate-bounce"
          style={{ animationDelay: `${i * 0.18}s`, animationDuration: "0.9s" }}
        />
      ))}
    </div>
  );
}

// ─── ChatMessage ─────────────────────────────────────────────────────────────

/**
 * A single chat message bubble.
 *
 * User messages: right-aligned, primary colour background.
 * Bot messages:  left-aligned, muted background.
 * Timestamps appear on hover so they don't clutter the UI.
 */
function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <div
      className={cn(
        "group flex gap-2 items-end",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* ── Mini avatar ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          "shrink-0 flex items-center justify-center",
          "w-6 h-6 rounded-lg mb-0.5",
          isUser
            ? "bg-primary/15 dark:bg-primary/25"
            : "bg-muted",
        )}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </div>

      {/* ── Bubble ──────────────────────────────────────────────────────── */}
      <div className="relative max-w-[78%]">
        <div
          className={cn(
            "px-3.5 py-2.5 text-sm leading-relaxed",
            isUser
              ? [
                  // User: primary blue, white text, tail on the right
                  "bg-primary text-primary-foreground",
                  "rounded-2xl rounded-br-[4px]",
                ]
              : [
                  // Bot: muted background, standard text, tail on the left
                  "bg-muted text-foreground",
                  "rounded-2xl rounded-bl-[4px]",
                  // Error variant
                  msg.status === "error" &&
                    "!bg-destructive/10 !text-destructive border border-destructive/20",
                ],
          )}
        >
          {/* Show typing animation while streaming */}
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

        {/* Timestamp — fades in on hover to keep the UI clean */}
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

// ─── Chatbot (main export) ────────────────────────────────────────────────────

export function Chatbot({
  chatflowId,
  apiHost,
  welcomeMessage = "Hey! 👋 I'm an AI assistant built into this portfolio. Ask me about projects, skills, experience — or anything else!",
  position = "bottom-right",
  isDarkMode: isDarkModeProp,
  apiKey,
  botName = "Veang's Assistant",
  botSubtitle = "Ask me anything",
  autoOpen = true,
}: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [hasError, setHasError] = useState(false);
  /** Prevents a flash of unstyled content while next-themes resolves the theme */
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // ── Mount guard (avoids next-themes hydration mismatch) ──────────────────
  useEffect(() => setMounted(true), []);

  // ── Auto-open once per session ────────────────────────────────────────────
  // Fires 1.5 s after the page loads so it doesn't interrupt the initial render.
  // sessionStorage ensures it only triggers once — refreshing re-opens,
  // but navigating between pages in the same tab does not.
  useEffect(() => {
    if (!autoOpen) return;
    const key = "chatbot-auto-opened";
    if (sessionStorage.getItem(key)) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(key, "1");
    }, 1500);
    return () => clearTimeout(t);
  }, [autoOpen]);

  // isDark is only used for the `isDarkMode` prop consumers; the component
  // itself is fully theme-aware via Tailwind's `dark:` prefix + CSS variables.
  const isDark =
    isDarkModeProp !== undefined ? isDarkModeProp : resolvedTheme === "dark";
  // Expose to parent if needed — otherwise the variable is kept for future use.
  void isDark;

  // ── Show welcome message the first time the chat is opened ───────────────
  useEffect(() => {
    if (open && messages.length === 0 && welcomeMessage) {
      setMessages([
        {
          id: uid(),
          role: "assistant",
          content: welcomeMessage,
          timestamp: new Date(),
          status: "done",
        },
      ]);
    }
    // We intentionally exclude `messages` from deps — we only want this to run
    // once (when the chat first opens with no history).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Auto-scroll to the newest message ────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Focus input when the window opens ────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, [open]);

  // ── Escape key closes the chat ────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // ── Clear conversation ────────────────────────────────────────────────────
  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setBusy(false);
    setHasError(false);
    setMessages(
      welcomeMessage
        ? [
            {
              id: uid(),
              role: "assistant",
              content: welcomeMessage,
              timestamp: new Date(),
              status: "done",
            },
          ]
        : [],
    );
  }, [welcomeMessage]);

  // ── Send a message to Flowise ─────────────────────────────────────────────
  // `questionOverride` lets suggestion chips send a question directly without
  // touching the textarea draft state.
  const send = useCallback(async (questionOverride?: string) => {
    const question = (questionOverride ?? draft).trim();
    if (!question || busy) return;

    // Optimistically show the user's message + a "streaming" placeholder
    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: question,
      timestamp: new Date(),
      status: "done",
    };
    const botId = uid();
    const botMsg: Message = {
      id: botId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      status: "streaming",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setDraft("");
    setBusy(true);
    setHasError(false);

    // Reset textarea height back to one line
    if (inputRef.current) inputRef.current.style.height = "auto";

    // Build request headers (auth is optional)
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

    // 30-second timeout — aborts both SSE reads and regular fetches
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const timeoutId = setTimeout(() => ctrl.abort("timeout"), 30_000);

    try {
      const res = await fetch(
        `${apiHost}/api/v1/prediction/${chatflowId}`,
        {
          method: "POST",
          headers,
          // Do NOT send streaming:true — let Flowise decide the response format.
          // Flowise Cloud returns plain JSON; self-hosted may return SSE.
          body: JSON.stringify({ question }),
          signal: ctrl.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} — ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type") ?? "";

      // ── Path A: SSE streaming response ─────────────────────────────────
      if (contentType.includes("text/event-stream") && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        // Buffer incomplete SSE lines split across two read() chunks
        let lineBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Append new chunk to the carry-over buffer
          lineBuffer += decoder.decode(value, { stream: true });

          // Process all complete lines (split on \n, keep the last partial)
          const lines = lineBuffer.split("\n");
          lineBuffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            const payload = trimmed.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;

            try {
              // Format A1 — Flowise JSON token: {"event":"token","data":"..."}
              const parsed = JSON.parse(payload);

              if (parsed.event === "token" && typeof parsed.data === "string") {
                accumulated += parsed.data;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botId ? { ...m, content: accumulated } : m,
                  ),
                );
              } else if (
                // Format A2 — some versions put the full text in the end event
                parsed.event === "end" &&
                typeof parsed.data === "string" &&
                parsed.data !== "[DONE]" &&
                accumulated === ""
              ) {
                accumulated = parsed.data;
              }
            } catch {
              // Format A3 — raw text line (not JSON-wrapped), append directly
              if (payload !== "[DONE]") {
                accumulated += payload;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === botId ? { ...m, content: accumulated } : m,
                  ),
                );
              }
            }
          }
        }

        // Guard: if accumulated is still empty the chatflow returned nothing
        if (!accumulated) {
          throw new Error("empty_response");
        }

        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, status: "done" } : m)),
        );

      // ── Path B: standard JSON response (non-streaming) ─────────────────
      } else {
        const json = await res.json();

        // Flowise returns the answer under different keys depending on version.
        // Check all known variants; fall back to a stringified dump for debug.
        const text: string =
          (typeof json === "string" ? json : null) ??
          json.text ??
          json.answer ??
          json.output ??
          json.response ??
          json.message ??
          json.content ??
          (Array.isArray(json.outputs) && typeof json.outputs[0]?.text === "string"
            ? json.outputs[0].text
            : null) ??
          "";

        if (!text) {
          // Log the raw response so the user can inspect it in DevTools
          console.warn("[Chatbot] Unexpected Flowise response shape:", json);
          throw new Error("empty_response");
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ? { ...m, content: text, status: "done" } : m,
          ),
        );
      }
    } catch (err) {
      clearTimeout(timeoutId);

      // AbortError fires when the user closes the tab, navigates away, or
      // when we deliberately abort (clearChat). Ignore these silently.
      if (err instanceof DOMException && err.name === "AbortError") return;

      const errText =
        (err as Error).message?.includes("timeout") ||
        (err instanceof DOMException && err.name === "TimeoutError")
          ? "The request timed out. Please try again."
          : "Couldn't reach the AI — is your Flowise instance running?";

      setHasError(true);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botId ? { ...m, content: errText, status: "error" } : m,
        ),
      );
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }, [draft, busy, apiHost, chatflowId, apiKey]);

  // Submit on Enter; Shift+Enter inserts a newline
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Skip rendering on the server — avoids theme-related hydration flash
  if (!mounted) return null;

  const isRight = position === "bottom-right";

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-4",
        isRight
          ? "bottom-6 right-6 items-end"
          : "bottom-6 left-6 items-start",
      )}
      role="complementary"
      aria-label="AI Chat Assistant"
    >
      {/* ── Chat Window ─────────────────────────────────────────────────── */}
      {open && (
        <div
          className={cn(
            "flex flex-col",
            // Responsive width: compact on small screens, comfortable on sm+
            "w-[calc(100vw-3rem)] sm:w-[400px] max-w-[400px]",
            "h-[min(560px,calc(100vh-6rem))]",
            "rounded-2xl border border-border",
            "bg-background",
            // Layered shadow: crisp in light mode, dramatic in dark
            "shadow-2xl shadow-black/10 dark:shadow-black/60",
            // Entrance animation — tailwindcss-animate (already installed)
            "animate-in slide-in-from-bottom-4 fade-in-0 duration-300 ease-out",
          )}
          role="dialog"
          aria-label={`Chat with ${botName}`}
          aria-modal="false"
        >
          {/* ── Header ────────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex items-center justify-between",
              "px-4 py-3 rounded-t-2xl",
              "border-b border-border",
              // Subtle primary tint that works in both themes via CSS vars
              "bg-gradient-to-r from-primary/5 via-primary/[0.07] to-transparent",
            )}
          >
            <div className="flex items-center gap-3">
              {/* Bot avatar + online indicator */}
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-[18px] h-[18px] text-primary" />
                </div>
                {/* Green "online" dot */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background"
                  aria-label="Online"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">
                  {botName}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {botSubtitle}
                </p>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={clearChat}
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* ── Messages ──────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex-1 overflow-y-auto",
              "px-4 py-4 space-y-5",
              // Thin scrollbar using Tailwind arbitrary variants (no plugin needed)
              "[&::-webkit-scrollbar]:w-1",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-border/60",
            )}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((m) => (
              <ChatMessage key={m.id} msg={m} />
            ))}

            {/* ── Suggested questions ─────────────────────────────────── */}
            {/* Re-appears after every bot reply so they're always reachable */}
            {messages.length > 0 &&
              messages[messages.length - 1].role === "assistant" &&
              messages[messages.length - 1].status === "done" &&
              !busy && (
                <div className="pl-8 flex flex-col gap-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className={cn(
                        "group flex items-center justify-between gap-2",
                        "text-left text-[11px] px-3 py-1.5 rounded-lg",
                        "border border-border/50 hover:border-primary/30",
                        "text-muted-foreground hover:text-primary",
                        "bg-muted/30 hover:bg-primary/5",
                        "transition-all duration-150",
                      )}
                    >
                      <span>{q}</span>
                      <ArrowRight className="w-3 h-3 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                    </button>
                  ))}
                </div>
              )}

            {/* Invisible anchor to scroll into view */}
            <div ref={bottomRef} />
          </div>

          {/* ── Error banner ──────────────────────────────────────────── */}
          {hasError && (
            <div
              className="mx-3 mb-2 flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-destructive bg-destructive/10 border border-destructive/20"
              role="alert"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                Unable to reach the AI. Is your Flowise instance running?
              </span>
            </div>
          )}

          {/* ── Input row ─────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex items-end gap-2",
              "p-3 rounded-b-2xl",
              "border-t border-border",
              "bg-muted/20",
            )}
          >
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                // Auto-grow — caps at roughly 4 lines (~104 px)
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 104)}px`;
              }}
              onKeyDown={onKey}
              placeholder="Ask me anything… (Enter to send)"
              rows={1}
              disabled={busy}
              className={cn(
                "flex-1 resize-none bg-transparent text-sm",
                "text-foreground placeholder:text-muted-foreground/60",
                "border-0 outline-none ring-0 focus:ring-0",
                "min-h-9 max-h-[104px] py-[8px] px-1 leading-snug",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
              aria-label="Type your message"
              aria-multiline="true"
            />

            <Button
              size="icon"
              className="h-8 w-8 shrink-0 rounded-xl transition-all duration-150"
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
        </div>
      )}

      {/* ── Floating Toggle Button ─────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative w-14 h-14 rounded-2xl",
          "bg-primary text-primary-foreground",
          "flex items-center justify-center",
          // Coloured shadow for depth — matches primary hue in both themes
          "shadow-lg shadow-primary/30",
          "transition-all duration-200 ease-out",
          "hover:scale-110 hover:shadow-xl hover:shadow-primary/40",
          "active:scale-95",
          // Keyboard focus ring (matches the site's focus style)
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-label={open ? "Close chat" : "Open AI chat assistant"}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {/* MessageSquare → X icon crossfade */}
        <MessageSquare
          className={cn(
            "w-6 h-6 absolute transition-all duration-200",
            open
              ? "opacity-0 scale-50 rotate-90"
              : "opacity-100 scale-100 rotate-0",
          )}
          aria-hidden="true"
        />
        <X
          className={cn(
            "w-6 h-6 absolute transition-all duration-200",
            open
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-90",
          )}
          aria-hidden="true"
        />

        {/* Pulsing halo — draws the user's eye when the chat is closed */}
        {!open && (
          <span
            className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}

/*
 * ─── Alternative: flowise-embed-react ────────────────────────────────────────
 *
 * If you prefer the official Flowise embed widget (less control over styling
 * but zero implementation overhead), install it and use it like this:
 *
 *   npm install flowise-embed-react
 *
 * Then create a wrapper with dynamic import (required — the package uses
 * browser APIs that break Next.js SSR):
 *
 *   // components/chatbot-flowise-embed.tsx
 *   "use client";
 *   import dynamic from "next/dynamic";
 *   import { useTheme } from "next-themes";
 *
 *   const BubbleChat = dynamic(
 *     () => import("flowise-embed-react").then((m) => m.BubbleChat),
 *     { ssr: false }
 *   );
 *
 *   export function ChatbotEmbed({ chatflowId, apiHost }: { chatflowId: string; apiHost: string }) {
 *     const { resolvedTheme } = useTheme();
 *     const isDark = resolvedTheme === "dark";
 *
 *     return (
 *       <BubbleChat
 *         chatflowid={chatflowId}
 *         apiHost={apiHost}
 *         theme={{
 *           button: {
 *             backgroundColor: isDark ? "#3b82f6" : "#3b82f6",
 *             right: 24,
 *             bottom: 24,
 *             size: "medium",
 *             iconColor: "white",
 *           },
 *           chatWindow: {
 *             backgroundColor: isDark ? "#0f172a" : "#ffffff",
 *             textColor: isDark ? "#f1f5f9" : "#0f172a",
 *             fontSize: 14,
 *             botMessageBackgroundColor: isDark ? "#1e293b" : "#f1f5f9",
 *             botMessageTextColor: isDark ? "#f1f5f9" : "#0f172a",
 *             userMessageBackgroundColor: "#3b82f6",
 *             userMessageTextColor: "#ffffff",
 *             showTitle: true,
 *             title: "Portfolio AI",
 *             poweredByTextColor: isDark ? "#475569" : "#94a3b8",
 *           },
 *         }}
 *       />
 *     );
 *   }
 *
 * The custom component above (Chatbot) is recommended over this approach
 * because it gives you pixel-perfect control and no third-party CSS conflicts.
 */
