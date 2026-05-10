import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome — Polymarket Sure Bet Finder",
  description:
    "Polymarket Sure Bet Finder is installed. Scan thousands of markets for high-probability, short-window bets — the kind that compound capital fast.",
};

export default function SureBetFinderWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
