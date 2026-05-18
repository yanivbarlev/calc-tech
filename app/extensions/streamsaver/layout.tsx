import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stream Saver — Download HLS, M3U8 & MP4 Videos | Chrome Extension",
  description:
    "Stream Saver downloads HLS streams and MP4 videos from any site. Real segment-by-segment download — not just a playlist save. Free with 5 downloads/day, PRO unlimited.",
  openGraph: {
    title: "Stream Saver — Download HLS, M3U8 & MP4 Videos",
    description:
      "The only Chrome extension that actually downloads HLS streams. Fetches segments, decrypts AES-128, and muxes into a playable MP4.",
    url: "https://calc-tech.com/extensions/streamsaver",
    siteName: "Calc-Tech",
    type: "website",
  },
};

export default function StreamSaverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
