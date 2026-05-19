import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatBlink Launcher — Random Chat from Any Tab",
  description:
    "One click to start random anonymous chat from any website. No tab-switching, no ads, no fluff. Free Chrome extension — 5 chats/day free, $4.99 PRO for unlimited.",
  openGraph: {
    title: "ChatBlink Launcher — Random Chat from Any Tab",
    description:
      "One click to start random anonymous chat from any website. No tab-switching, no ads, no fluff.",
    url: "https://calc-tech.com/chat",
    siteName: "Calc-Tech",
    type: "website",
  },
};

export default function ChatLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
