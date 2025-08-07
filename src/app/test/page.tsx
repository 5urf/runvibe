import { Metadata } from "next";
import TestPageClient from "./TestPageClient";

export const metadata: Metadata = {
  title: "러닝 취향 분석 테스트 - RunVibe",
  description:
    "15개 질문으로 나만의 러닝 스타일을 찾아보세요. MBTI처럼 재미있게, 하지만 더 실용적으로!",
  keywords: "러닝, 취향분석, 러닝테스트, MBTI, 러너타입, 마라톤, 조깅",
  openGraph: {
    title: "러닝 취향 분석 테스트 - RunVibe",
    description: "15개 질문으로 나만의 러닝 스타일을 찾아보세요",
    type: "website",
    url: "/test",
  },
  twitter: {
    card: "summary_large_image",
    title: "러닝 취향 분석 테스트 - RunVibe",
    description: "15개 질문으로 나만의 러닝 스타일을 찾아보세요",
  },
};

export default function TestPage() {
  return <TestPageClient />;
}
