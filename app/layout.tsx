import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import AOSInitializer from "@/components/AOSInitializer";
import ConvexProviderClient from "@/components/ConvexClient";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Yazzi - Real Music. Real People.",
    template: "%s | Yazzi",
  },
  description:
    "Yazzi is a social space built for people who live through music. Connect with friends, share what you're listening to, and discover new sounds together.",
  keywords: [
    "Yazzi",
    "music social app",
    "real music",
    "music community",
    "discover music",
    "share tracks",
    "authentic vibes",
  ],
  authors: [{ name: "Yolo Services", url: "https://yolo-services.pl" }],
  creator: "Yazzi",
  publisher: "Yazzi",
  metadataBase: new URL("https://yazzi.app"),
  openGraph: {
    title: "Yazzi - Real Music. Real People.",
    description:
      "Music isn't just sound — it's identity. Show your vibe, your tracks, and what defines your rhythm. No fake hype, no algorithm bullshit.",
    url: "https://yazzi.app",
    siteName: "Yazzi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yazzi - Real Music. Real People.",
    description:
      "Join Yazzi to connect with friends, share tracks, and discover real music vibes — no fake hype, just authentic sounds.",
    creator: "@yazzi.app",
  },
  category: "social",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: "https://yazzi.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-white overflow-x-hidden">
        <Analytics />
        <AOSInitializer />
        <ConvexProviderClient>{children}</ConvexProviderClient>
      </body>
    </html>
  );
}
