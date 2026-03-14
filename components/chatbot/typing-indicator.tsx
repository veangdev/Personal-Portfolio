"use client";

/** Three bouncing dots shown while the bot is generating a response. */
export function TypingIndicator() {
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
