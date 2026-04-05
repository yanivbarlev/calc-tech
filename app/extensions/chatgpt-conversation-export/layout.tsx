import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "ChatGPT Conversation Export — Chrome Extension | Export ChatGPT to PDF, Markdown, and More",
  description:
    "Export any ChatGPT conversation as PDF, Markdown, Plain Text, CSV, JSON, or Image. 5 free exports. No account required. 100% private.",
  keywords:
    "chatgpt export, chatgpt conversation export, chatgpt to pdf, chatgpt to markdown, export chatgpt, chrome extension, chatgpt backup, save chatgpt conversation",
  openGraph: {
    title: "ChatGPT Conversation Export — Chrome Extension",
    description:
      "Export any ChatGPT conversation as PDF, Markdown, Plain Text, CSV, JSON, or Image. 5 free exports. Install in seconds.",
    url: "https://www.calc-tech.com/extensions/chatgpt-conversation-export",
    type: "website",
  },
};

export default function ChatGPTExportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
