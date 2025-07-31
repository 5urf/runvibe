import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RunVibe",
  description: "러닝 취향 분석 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
