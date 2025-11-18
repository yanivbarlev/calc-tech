import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Software Downloads & Reviews | Calc-Tech",
  description: "Download and review the best apps and software. Find guides, reviews, and download links.",
  other: {
    "google-adsense-account": "ca-pub-2201920716197483",
  },
};

export default function SoftwareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
