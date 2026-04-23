import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Telegram Video Downloader — Chrome Extension | Save Telegram Videos, Photos & Files",
  description:
    "Download videos, photos, stories, and files from Telegram Web in one click. Supports private channels and restricted content. Free to try.",
  keywords:
    "telegram video downloader, telegram download, save telegram video, telegram web downloader, telegram restricted content, chrome extension",
  openGraph: {
    title: "Telegram Video Downloader — Chrome Extension",
    description:
      "Download videos, photos, stories & files from Telegram Web in one click. Supports private channels & restricted content.",
    url: "https://www.calc-tech.com/extensions/telegram-video-downloader",
    type: "website",
  },
};

export default function TelegramDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
