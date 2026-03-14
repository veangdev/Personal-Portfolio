"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";

import { uid } from "./helper";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import ChatWindow from "./chat-window";
import ToggleButton from "./toggle-button";
import type { ChatbotProps, Message } from "./types";
import { SUGGESTED_QUESTIONS } from "./types";

export type { ChatbotProps };

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
  const [mounted, setMounted] = useState(false);
  const [askedSuggestions, setAskedSuggestions] = useState<Set<string>>(new Set());

  const { resolvedTheme } = useTheme();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Suppress next-themes hydration mismatch
  useEffect(() => setMounted(true), []);

  // Auto-open once per session
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

  // Expose isDark for potential parent consumers
  const isDark =
    isDarkModeProp !== undefined ? isDarkModeProp : resolvedTheme === "dark";
  void isDark;

  // Show welcome message the first time chat opens
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-scroll to newest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when window opens
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, [open]);

  // Escape closes chat
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setBusy(false);
    setHasError(false);
    setAskedSuggestions(new Set());
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

  const send = useCallback(
    async (questionOverride?: string) => {
      const question = (questionOverride ?? draft).trim();
      if (!question || busy) return;

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

      // Track if this question came from the suggestion chips
      if (questionOverride && (SUGGESTED_QUESTIONS as readonly string[]).includes(questionOverride)) {
        setAskedSuggestions((prev) => new Set(prev).add(questionOverride));
      }

      setMessages((prev) => [...prev, userMsg, botMsg]);
      setDraft("");
      setBusy(true);
      setHasError(false);

      if (inputRef.current) inputRef.current.style.height = "auto";

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const timeoutId = setTimeout(() => ctrl.abort("timeout"), 30_000);

      try {
        const res = await fetch(`${apiHost}/api/v1/prediction/${chatflowId}`, {
          method: "POST",
          headers,
          body: JSON.stringify({ question }),
          signal: ctrl.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);

        const contentType = res.headers.get("content-type") ?? "";

        // Path A: SSE streaming
        if (contentType.includes("text/event-stream") && res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";
          let lineBuffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            lineBuffer += decoder.decode(value, { stream: true });
            const lines = lineBuffer.split("\n");
            lineBuffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;

              const payload = trimmed.slice(5).trim();
              if (!payload || payload === "[DONE]") continue;

              try {
                const parsed = JSON.parse(payload);
                if (
                  parsed.event === "token" &&
                  typeof parsed.data === "string"
                ) {
                  accumulated += parsed.data;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === botId ? { ...m, content: accumulated } : m,
                    ),
                  );
                } else if (
                  parsed.event === "end" &&
                  typeof parsed.data === "string" &&
                  parsed.data !== "[DONE]" &&
                  accumulated === ""
                ) {
                  accumulated = parsed.data;
                }
              } catch {
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

          if (!accumulated) throw new Error("empty_response");
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, status: "done" } : m)),
          );

          // Path B: standard JSON
        } else {
          const json = await res.json();
          const text: string =
            (typeof json === "string" ? json : null) ??
            json.text ??
            json.answer ??
            json.output ??
            json.response ??
            json.message ??
            json.content ??
            (Array.isArray(json.outputs) &&
            typeof json.outputs[0]?.text === "string"
              ? json.outputs[0].text
              : null) ??
            "";

          if (!text) {
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
    },
    [draft, busy, apiHost, chatflowId, apiKey],
  );

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!mounted) return null;

  const isRight = position === "bottom-right";

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-4",
        isRight ? "bottom-6 right-6 items-end" : "bottom-6 left-6 items-start",
      )}
      role="complementary"
      aria-label="AI Chat Assistant"
    >
      {open && (
        <ChatWindow
          botName={botName}
          botSubtitle={botSubtitle}
          messages={messages}
          busy={busy}
          hasError={hasError}
          draft={draft}
          setDraft={setDraft}
          send={send}
          clearChat={clearChat}
          onClose={() => setOpen(false)}
          onKey={onKey}
          inputRef={inputRef}
          bottomRef={bottomRef}
          askedSuggestions={askedSuggestions}
        />
      )}

      <ToggleButton open={open} onClick={() => setOpen((v) => !v)} />
    </div>
  );
}
