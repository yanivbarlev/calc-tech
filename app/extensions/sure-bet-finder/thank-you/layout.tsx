import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you — Polymarket Sure Bet Finder",
  description:
    "Your Polymarket Sure Bet Finder license is on its way. Open the extension and activate it in seconds.",
};

export default function SureBetFinderThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
