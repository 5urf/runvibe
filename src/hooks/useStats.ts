import { IStatsData } from "@/types/stats";
import { useEffect, useState } from "react";

export const useStats = () => {
  const [stats, setStats] = useState<IStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/stats");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status} 오류`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("통계 API 오류:", err);
      const errorMessage =
        err instanceof Error ? err.message : "네트워크 연결을 확인해주세요.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const retry = () => {
    fetchStats();
  };

  return { stats, loading, error, retry };
};
