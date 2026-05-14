import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome — Read Aloud TTS",
  description:
    "Read Aloud TTS is now installed. Read any webpage out loud with one click — free, offline, 40+ languages, sentence highlighting, and speed control.",
};

export default function ReadAloudTtsWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
