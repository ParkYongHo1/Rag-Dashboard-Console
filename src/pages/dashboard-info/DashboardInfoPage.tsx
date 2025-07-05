// pages/DashboardInfoPage.tsx
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard-list/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useDashboardStore } from "@/stores/dashboardStore";
import DashboardDetailInfo from "@/components/dashboard-info/DashboardDetailInfo";
import DashboardDefaultInfo from "../../components/dashboard-info/DashboardDefaultInfo";
import { DashBoardInfoProps } from "@/types/dashboard-info";

const DashboardInfoPage = ({ mode }: DashBoardInfoProps) => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const [searchParams] = useSearchParams();
  const statusFromUrl = searchParams.get("status");

  const {
    setCurrentDashboard,
    clearCurrentDashboard,
    setLoading,
    currentDashboard,
    isLoading,
  } = useDashboardStore();

  // 페이지 레벨에서 API 호출
  const { data: dashboardData, isLoading: queryLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.READ({
      dashboardId: dashboardId!,
      status: statusFromUrl ?? "",
    }),
    queryFn: () =>
      dashboardService.getDashboardDefaultInfo({
        dashboardId: dashboardId!,
        status: statusFromUrl ?? "",
      }),
    enabled: mode === "edit" && Boolean(dashboardId),
  });

  // 데이터를 Zustand store에 저장
  useEffect(() => {
    if (dashboardData) {
      setCurrentDashboard(dashboardData);
    }
  }, [dashboardData, setCurrentDashboard]);

  // 로딩 상태 동기화
  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading, setLoading]);

  // 컴포넌트 언마운트 시 데이터 정리
  useEffect(() => {
    return () => {
      clearCurrentDashboard();
    };
  }, [clearCurrentDashboard]);

  // 로딩 상태 표시
  if (isLoading && mode === "edit") {
    return (
      <div className="m-auto w-full py-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    );
  }
  console.log(dashboardData);

  return (
    <div className="m-auto w-full py-6">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[98vw] border-gray-300 rounded-[5px] shadow-md m-auto my-6">
          <div className="bg-white w-full border border-gray-300 rounded-[5px] py-6 px-[50px] min-h-[700px]">
            <DashboardDefaultInfo mode={mode} dashboardId={dashboardId} />
            {mode === "edit" && currentDashboard && <DashboardDetailInfo />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInfoPage;
