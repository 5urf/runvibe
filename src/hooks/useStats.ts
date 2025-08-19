import { IStatsData } from "@/types/stats";
import { useEffect, useState } from "react";

export const useStats = () => {
  const [stats, setStats] = useState<IStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/stats");
      if (!response.ok) {
        console.error("통계 로딩 실패:", response.status);
        return;
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("통계 API 오류:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const refetch = () => {
    fetchStats();
  };

  return { stats, loading, refetch };
};
