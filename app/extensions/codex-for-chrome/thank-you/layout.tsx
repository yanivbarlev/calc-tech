import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Codex for Chrome — Setup Guide & Documentation | Calc-Tech",
  description:
    "Thanks for installing Codex for Chrome. The complete guide to the ChatGPT & Codex side panel: opening the panel, using prompt templates, the keyboard-shortcut cheatsheet, themes, privacy, and troubleshooting.",
  keywords:
    "codex for chrome, chatgpt sidebar, codex chrome extension guide, chatgpt keyboard shortcuts, chatgpt prompt templates, openai codex extension, chatgpt side panel",
  alternates: {
    canonical: "https://calc-tech.com/extensions/codex-for-chrome/thank-you",
  },
  openGraph: {
    title: "Codex for Chrome — Setup Guide & Documentation",
    description:
      "The complete guide to the ChatGPT & Codex side panel: prompt templates, keyboard shortcuts, themes, privacy, and troubleshooting.",
    url: "https://calc-tech.com/extensions/codex-for-chrome/thank-you",
    type: "article",
  },
};

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
