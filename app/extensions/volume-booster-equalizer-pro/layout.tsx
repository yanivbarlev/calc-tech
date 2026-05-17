import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volume Booster + Equalizer Pro — Boost Any Tab to 1000% with 5-Band EQ",
  description:
    "Free Chrome extension to boost tab volume up to 1000% with a 5-band equalizer. Fix quiet YouTube videos, Netflix, Zoom calls. Per-site memory, keyboard shortcuts, custom presets.",
  openGraph: {
    title: "Volume Booster + Equalizer Pro for Chrome",
    description:
      "Boost any tab to 1000% volume with a 5-band equalizer. Free Chrome extension — fix quiet YouTube, Netflix, Zoom, and more.",
    type: "website",
    url: "https://calc-tech.com/extensions/volume-booster-equalizer-pro",
  },
};

export default function VolumeBoosterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
