import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { statsService } from "@/services/stats/api";

interface UseStatsRefreshOptions {
  dashboardId: string;
  startDate: Date;
  endDate: Date;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  minRefreshTime?: number;
}

export const useStatsRefresh = ({
  dashboardId,
  startDate,
  endDate,
  onSuccess,
  onError,
  minRefreshTime = 1200,
}: UseStatsRefreshOptions) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const queryClient = useQueryClient();

  // selectGroupData는 빈 문자열로 설정 (StatsItemPage에서 관리)
  const { status, error, data } = useQuery({
    queryKey: QUERY_KEYS.STATISTICS.GET({
      dashboardId,
      selectGroupData: "",
      startDate,
      endDate,
    }),
    queryFn: () =>
      statsService.getStatistics({
        dashboardId,
        selectGroupData: "", // 기본값
        startDate,
        endDate,
      }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!dashboardId,
  });

  const resetTimers = () => {
    setRemainingTime(60);
  };

  const refreshStats = async (autoRefreshActive = false) => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    if (autoRefreshActive) {
      setIsLoading(true);
      setRemainingTime(60);
    }

    const start = Date.now();

    try {
      // 모든 statistics 관련 쿼리를 새로고침
      await queryClient.refetchQueries({
        queryKey: ["STATISTICS"],
      });

      const elapsed = Date.now() - start;
      const remaining = minRefreshTime - elapsed;
      if (remaining > 0) {
        await new Promise((res) => setTimeout(res, remaining));
      }

      onSuccess?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      onError?.(error);
    } finally {
      if (autoRefreshActive) {
        setIsLoading(false);
        resetTimers();
      }

      setIsRefreshing(false);
    }
  };

  const startAutoRefreshTimer = (intervalSeconds = 60) => {
    setRemainingTime(intervalSeconds);
  };

  console.log(data);

  return {
    isRefreshing,
    isLoading,
    remainingTime,
    refreshStats,
    setRemainingTime,
    statsData: data,
    isError: status === "error",
    error: error as Error | null,
    startAutoRefreshTimer,
  };
};
