import { Metadata } from "next";
import StatsPageClient from "./StatsPageClient";

export const metadata: Metadata = {
  title: "참여 통계",
  description:
    "러너들의 취향 분석 통계를 확인해보세요. 어떤 러너 타입이 가장 인기가 많을까요? 실시간 참여 데이터와 타입별 분포를 한눈에!",
  keywords: [
    "러닝",
    "취향분석",
    "통계",
    "데이터",
    "러너타입",
    "분포",
    "참여현황",
    "RunVibe",
    "러닝테스트",
    "MBTI",
    "마라톤",
    "조깅",
  ],
  openGraph: {
    title: "러닝 취향 분석 통계 - RunVibe",
    description:
      "러너들의 취향 분석 통계를 확인해보세요. 어떤 러너 타입이 가장 인기가 많을까요?",
    type: "website",
    url: "/stats",
    siteName: "RunVibe",
  },
  twitter: {
    card: "summary_large_image",
    title: "러닝 취향 분석 통계 - RunVibe",
    description:
      "러너들의 취향 분석 통계를 확인해보세요. 어떤 러너 타입이 가장 인기가 많을까요?",
  },
  alternates: {
    canonical: "/stats",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function StatsPage() {
  return <StatsPageClient />;
}
