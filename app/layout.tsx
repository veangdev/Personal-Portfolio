import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Chatbot } from "@/components/chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const FULL_NAME = process.env.FULL_NAME || "Veang Kroh";

export const metadata: Metadata = {
  title: `${FULL_NAME} - Full Stack Developer`,
  description: `Professional portfolio of ${FULL_NAME}, a passionate full-stack developer specializing in modern web technologies.`,
  keywords:
    "full stack developer, web developer, React, Next.js, Node.js, portfolio",
  authors: [{ name: FULL_NAME }],
  openGraph: {
    title: `${FULL_NAME} - Full Stack Developer`,
    description:
      "Professional portfolio showcasing modern web development projects",
    type: "website",
  },
  generator: "v0.dev",
};

export default function RootLayout(arg: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* {arg.children} */}
          {/* <Chatbot
            chatflowId={process.env.NEXT_PUBLIC_FLOWISE_CHATFLOW_ID ?? ""}
            apiHost={process.env.NEXT_PUBLIC_FLOWISE_API_HOST ?? ""}
            apiKey={process.env.NEXT_PUBLIC_FLOWISE_API_KEY}
          /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
