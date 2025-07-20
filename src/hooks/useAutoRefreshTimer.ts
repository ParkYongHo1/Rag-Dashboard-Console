import { useEffect } from "react";
interface autoRefreshTimerProps {
  autoRefresh: boolean;
  refreshStats: (autoRefreshActive?: boolean) => Promise<void>;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}
export const useAutoRefreshTimer = ({
  autoRefresh,
  refreshStats,
  setRemainingTime,
}: autoRefreshTimerProps) => {
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          refreshStats(true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshStats, setRemainingTime]);
};
