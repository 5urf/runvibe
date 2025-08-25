import { Footer, Header } from "@/components/ui";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - RunVibe",
    default: "RunVibe - 러닝 취향 분석 서비스",
  },
  description:
    "MBTI처럼 재미있는 러닝 취향 분석 서비스. 15개 질문으로 나만의 러닝 스타일을 찾아보세요.",
  keywords:
    "러닝, 취향분석, 러닝테스트, MBTI, 러너타입, 마라톤, 조깅, 러닝크루",
  authors: [{ name: "RunVibe Team" }],
  creator: "RunVibe",
  publisher: "RunVibe",
  metadataBase: new URL("https://runvibe.vercel.app"), // 실제 배포 URL로 변경
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "RunVibe",
    images: [
      {
        url: "/og-image.png", // TODO: OpenGraph 이미지 추가
        width: 1200,
        height: 630,
        alt: "RunVibe - 러닝 취향 분석 서비스",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Google Search Console 인증 후 추가
    // google: "google-verification-code",
    // naver: "naver-verification-code"
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={inter.variable}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <div className='flex-grow'>{children}</div>
        <Footer />
        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
}
