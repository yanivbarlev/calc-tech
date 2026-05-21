import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Aloud Text to Speech for Chrome",
  description:
    "Install Read Aloud Text to Speech for Chrome and listen to webpages, documents, selected text, and articles with one click.",
};

export default function ReadAloudTtsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
