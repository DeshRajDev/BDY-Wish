import type { Metadata, Viewport } from "next";
import "./globals.css";
import { birthdayConfig } from "@/config/birthday";

export const metadata: Metadata = {
  title: `Happy Birthday, ${birthdayConfig.girlfriendName}! ❤️`,
  description: "A special romantic birthday surprise made with all my love.",
  keywords: ["birthday", "romantic", "surprise", "love"],
  authors: [{ name: birthdayConfig.senderName }],
  openGraph: {
    title: `Happy Birthday, ${birthdayConfig.girlfriendName}! ❤️`,
    description: "A special romantic birthday surprise made with all my love.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080307",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#080307] text-white antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
