import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Random Chat — Talk to Strangers Anonymously | Calc-Tech",
  description:
    "Free random chat with strangers. No sign-up, no app, no waiting. Pick a username, confirm you're 18+, and start chatting instantly.",
  alternates: { canonical: "https://calc-tech.com/random-chat" },
  openGraph: {
    title: "Random Chat — Talk to Strangers Anonymously",
    description:
      "Free anonymous chat with strangers. Pick a name, confirm 18+, start talking. No sign-up.",
    url: "https://calc-tech.com/random-chat",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RandomChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={outfit.variable} style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif" }}>
      {children}
    </div>
  );
}
