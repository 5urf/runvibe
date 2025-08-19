import { IStatsData } from "@/types/stats";
import { useEffect, useState } from "react";

export const useStats = () => {
  const [stats, setStats] = useState<IStatsData | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) {
          console.error("통계 로딩 실패:", response.status);
          return;
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("통계 API 오류:", err);
      }
    };

    fetchStats();
  }, []);

  return { stats };
};
