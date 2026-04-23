import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Facebook Messenger Free Cleaner — Chrome Extension | Bulk Delete Messenger Chats",
  description:
    "Bulk delete or archive all Facebook Messenger chats, including Marketplace Buy/Sell messages, in one click. Free to use. No account required.",
  keywords:
    "delete facebook messages, bulk delete messenger, facebook messenger cleaner, clear messenger history, archive facebook messages, chrome extension",
  openGraph: {
    title: "Facebook Messenger Free Cleaner — Chrome Extension",
    description:
      "Bulk delete or archive all Facebook Messenger chats, including Marketplace Buy/Sell messages, with a single click.",
    url: "https://www.calc-tech.com/extensions/facebook-messenger-cleaner",
    type: "website",
  },
};

export default function MsgEraserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
