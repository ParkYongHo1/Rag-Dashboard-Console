import RefreshIcon from "@/shared/ui/RefreshIcon";

interface RefreshButtonProps {
  autoRefresh?: boolean;
  onRefreshStarted?: () => void;
  onRefreshCompleted?: () => void;
  refreshStats: (autoRefreshActive?: boolean) => Promise<void>;
  isRefreshing: boolean;
}

const RefreshButton = ({
  autoRefresh = false,
  onRefreshStarted,
  onRefreshCompleted,
  refreshStats,
  isRefreshing,
}: RefreshButtonProps) => {
  const handleRefreshClick = async () => {
    try {
      onRefreshStarted?.();
      await refreshStats(autoRefresh);
      onRefreshCompleted?.();
    } catch (error: unknown) {
      let message = "알 수 없는 오류가 발생했습니다.";
      if (error instanceof Error) {
        message = error.message;
      }
      alert(`새로고침에 실패했습니다.\n${message}`);
    }
  };

  return (
    <button
      onClick={handleRefreshClick}
      className="relative group bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer h-[40px]"
      disabled={isRefreshing}
    >
      <RefreshIcon isSpinning={isRefreshing} />
    </button>
  );
};

export default RefreshButton;
