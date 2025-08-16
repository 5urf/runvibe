import { useMemo } from "react";

export const useShareUrl = (resultId: string) => {
  return useMemo(() => {
    if (typeof window === "undefined") return "";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    return `${baseUrl}/result/${resultId}`;
  }, [resultId]);
};
