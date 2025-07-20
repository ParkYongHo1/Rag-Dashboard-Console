import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import help from "@/assets/dashboard-list/help.svg";
import RefreshButton from "./RefreshButton";
import DateSelector from "./DateSelector";
import { AutoRefresh } from "./AutoRefresh";
import { useStatsRefresh } from "@/hooks/useStatsRefresh";
import { useAutoRefreshTimer } from "@/hooks/useAutoRefreshTimer";

const StatsHeader = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const { isRefreshing, refreshStats, remainingTime, setRemainingTime } =
    useStatsRefresh({
      dashboardId: dashboardId || "",
      startDate,
      endDate,
      onSuccess: () => {
        console.log("Refresh successful");
      },
      onError: (error) => {
        alert(`새로고침에 실패했습니다.\n${error.message}`);
      },
    });

  // 날짜 변경 시 자동으로 데이터 조회 (dashboardId가 있을 때만)
  useEffect(() => {
    if (dashboardId) {
      refreshStats();
    }
  }, [startDate, endDate, dashboardId]);

  useAutoRefreshTimer({
    autoRefresh,
    refreshStats,
    setRemainingTime,
  });

  return (
    <div className="flex justify-between items-center py-4 shadow-md px-6 mb-[20px] border border-gray-200 rounded-[5px]">
      <div className="flex flex-col gap-[5px]">
        <div className="flex gap-[10px] items-center">
          <img src={help} />
          <p className="text-sm text-gray-500">
            날짜 선택 시 해당 날짜의 데이터가 조회됩니다.
          </p>
        </div>
        <div className="flex gap-[10px] items-center">
          <img src={help} />
          <p className="text-sm text-gray-500">
            PDF 버튼 클릭 시 해당 화면이 PDF파일로 다운로드 됩니다.
          </p>
        </div>
      </div>
      <div className="flex gap-[10px] items-center relative">
        <AutoRefresh
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          remainingTime={remainingTime}
          isRefreshing={isRefreshing}
        />
        <DateSelector
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
        />
        <RefreshButton
          autoRefresh={autoRefresh}
          refreshStats={refreshStats}
          isRefreshing={isRefreshing}
          onRefreshStarted={() => setRemainingTime(60)}
          onRefreshCompleted={() => setRemainingTime(60)}
        />
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-[40px]">
          PDF
        </button>
      </div>
    </div>
  );
};

export default StatsHeader;
