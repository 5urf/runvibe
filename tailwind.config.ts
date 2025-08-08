import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 메인 브랜드 컬러
        primary: {
          400: "#fb923c",
          500: "#f97316", // 메인 오렌지
          600: "#ea580c",
        },
        // 러너 타입별 배경 컬러 (6가지)
        runner: {
          slow: "#dcfce7", // 슬로우 러너
          marathoner: "#dbeafe", // 마라토너
          trail: "#fed7aa", // 트레일 러너
          crew: "#e9d5ff", // 크루 러너
          style: "#fce7f3", // 패션 러너
          race: "#fef3c7", // 레이스 헌터
        },
      },

      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #fff7ed 0%, #fdf2f8 50%, #e9d5ff 100%)",
        "button-gradient": "linear-gradient(135deg, #fb923c 0%, #f472b6 100%)",
      },

      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        button: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
