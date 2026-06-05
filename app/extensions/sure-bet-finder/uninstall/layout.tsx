import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sorry to see you go — Polymarket Sure Bet Finder",
  description:
    "Uninstalled by accident? Reinstall Polymarket Sure Bet Finder in one click — or tell us why you left.",
  robots: { index: false, follow: false },
};

export default function SureBetFinderUninstallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
