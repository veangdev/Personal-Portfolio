
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  /** "streaming" renders animated typing dots; "error" applies error styling */
  status: "streaming" | "done" | "error";
}

export interface ChatbotProps {
  /** Flowise chatflow ID */
  chatflowId: string;
  /** Base URL of your Flowise instance — no trailing slash */
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

/** Shown as clickable chips after every bot reply */
export const SUGGESTED_QUESTIONS = [
  "What are Veang's key skills?",
  "Tell me about Veang's projects",
  "How can I contact Veang?",
] as const;
