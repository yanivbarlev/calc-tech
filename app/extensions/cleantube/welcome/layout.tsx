import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to CleanTube — YouTube Without the Distractions",
  description:
    "CleanTube is installed. Hide YouTube Shorts, recommended videos, comments, autoplay, and other distractions. You're in control.",
};

export default function CleanTubeWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
