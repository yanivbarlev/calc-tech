"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Pages where AdSense must never load (paid acquisition funnels, etc.)
const NO_ADS_PATHS = ["/whatsapp-lp"];

export default function AdSense() {
  const pathname = usePathname();
  if (NO_ADS_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2201920716197483"
      crossOrigin="anonymous"
      strategy="beforeInteractive"
    />
  );
}
