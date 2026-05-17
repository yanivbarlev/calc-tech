import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome - AI Chat Summarizer for WhatsApp",
  description:
    "AI Chat Summarizer for WhatsApp is installed. Get instant TL;DRs, topics, action items, and AI-drafted replies from any WhatsApp chat.",
};

export default function WhatsAppAiSummarizerWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
