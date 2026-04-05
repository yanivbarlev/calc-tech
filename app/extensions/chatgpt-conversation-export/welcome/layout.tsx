import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Welcome to ChatGPT Conversation Export — You're All Set",
  description:
    "ChatGPT Conversation Export is installed. Export any ChatGPT conversation as PDF, Markdown, Text, CSV, JSON, or Image. 5 free exports included.",
};

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
