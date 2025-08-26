import { Metadata } from "next";
import { baseKeywords, runnerTypeKeywords } from "../../../lib/seo";
import StatsPageClient from "./StatsPageClient";

const statsPageKeywords = [
  ...baseKeywords,
  ...runnerTypeKeywords,
  "통계",
  "데이터",
  "분포",
  "참여현황",
  "운동통계",
  "피트니스데이터",
  "러닝분석",
  "스포츠통계",
  "러너 데이터",
];

export const metadata: Metadata = {
  title: "참여 통계",
  description:
    "러너들의 취향 분석 통계를 확인해보세요. 어떤 러너 타입이 가장 인기가 많을까요? 실시간 참여 데이터와 타입별 분포를 한눈에!",
  keywords: [...new Set(statsPageKeywords)],
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
