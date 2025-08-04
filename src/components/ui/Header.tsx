"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "러닝 취향 분석";
      case "/test":
        return "러닝 취향 분석 테스트";
      case "/about":
        return "서비스 소개";
      case "/stats":
        return "참여 통계";
      default:
        if (pathname.startsWith("/result/")) {
          return "결과";
        }
        return "러닝 취향 분석";
    }
  };

  return (
    <header className='px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-white/20'>
      <div className='max-w-4xl mx-auto flex items-center justify-between'>
        <Link
          href='/'
          className='text-2xl font-bold text-primary-500 hover:text-primary-600 transition-colors'
        >
          🏃‍♂️ RunVibe
        </Link>
        <div className='text-lg font-bold text-gray-800'>{getPageTitle()}</div>
      </div>
    </header>
  );
};

export default Header;
