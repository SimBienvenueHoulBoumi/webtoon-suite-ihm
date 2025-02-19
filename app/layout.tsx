import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "webtoon suite",
  description: "save your watch history and read webtoons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
