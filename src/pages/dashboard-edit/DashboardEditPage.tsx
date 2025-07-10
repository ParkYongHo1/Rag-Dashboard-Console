import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard-list/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useDashboardStore } from "@/stores/dashboardStore";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import back from "@/assets/dashboard-info/back.svg";
import save from "@/assets/dashboard-info/save.svg";
import { LinkButton } from "@/shared/ui/LinkButton";
import DashboardDetailInfo from "@/components/dashboard-edit/detail-info/DashboardDetailInfo";
import { useMutation } from "@tanstack/react-query";
import { DashboardEditRequest } from "@/types/dashboard-info";
import { dashboardInfoService } from "@/services/dashboard-info/api";
import DashboardDefaultInfo from "@/components/dashboard-edit/default-info/DashboardDefaultInfo";

const DashboardEditPage = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const statusFromState = location.state?.status;

  const {
    setCurrentDashboard,
    clearCurrentDashboard,
    setLoading,
    currentDashboard,
    isLoading,
    groupItems,
    aggregatedItems,
  } = useDashboardStore();

  const { data: dashboardData, isLoading: queryLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.READ({
      dashboardId: dashboardId!,
      status: statusFromState ?? "",
    }),
    queryFn: () =>
      dashboardService.getDashboardDefaultInfo({
        dashboardId: dashboardId!,
        status: statusFromState ?? "",
      }),
    enabled: Boolean(dashboardId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: DashboardEditRequest) =>
      dashboardInfoService.updateDashboard(data),
    onSuccess: () => {
      navigate("/", { replace: true });
      alert("대시보드가 수정되었습니다.");
    },
    onError: (error) => {
      alert("요청 중 문제가 발생했습니다.");
      console.error(error);
    },
  });

  useEffect(() => {
    if (dashboardData) {
      setCurrentDashboard(dashboardData);
    }
  }, [dashboardData, setCurrentDashboard]);

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading, setLoading]);

  useEffect(() => {
    return () => {
      clearCurrentDashboard();
    };
  }, [clearCurrentDashboard]);

  const createDashboardDetailInfo = () => {
    const groupData = groupItems.map((item) => ({
      groupId: item.groupId,
      databaseColumn: item.databaseColumn,
      databaseColumnAlias: item.databaseColumnAlias,
      data: item.data,
    }));

    const aggregatedData = aggregatedItems.map((item) => ({
      aggregatedId: item.aggregatedId,
      aggregatedDatabaseColumn: item.aggregatedDatabaseColumn,
      dataType: item.dataType,
      databaseColumnAlias: item.databaseColumnAlias,
      dashboardCondition: item.dashboardCondition,
      conditionValue: item.conditionValue,
      statMethod: item.statMethod,
    }));

    return {
      groupData,
      aggregatedData,
    };
  };

  const handleSave = () => {
    console.log("=== 저장 버튼 클릭 ===");
    console.log("현재 그룹 데이터:", groupItems);
    console.log("현재 집계 데이터:", aggregatedItems);

    const dashboardDetailInfo = createDashboardDetailInfo();

    const requestData: DashboardEditRequest = {
      dashboardId: dashboardId!,
      dashboardDetailInfo,
    };

    console.log("=== 최종 API 요청 데이터 ===");
    console.log(JSON.stringify(requestData, null, 2));

    mutate(requestData);
  };

  if (isLoading) {
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="대시보드 정보를 불러오는 중입니다..."
      />
    );
  }
  const isAllFieldsFilled = () => {
    const isGroupDataValid = groupItems.every(
      (item) =>
        item.groupId &&
        item.databaseColumn &&
        item.databaseColumnAlias &&
        item.data
    );

    const isAggregatedDataValid = aggregatedItems.every(
      (item) =>
        item.aggregatedId &&
        item.aggregatedDatabaseColumn &&
        item.dataType &&
        item.databaseColumnAlias &&
        item.dashboardCondition &&
        item.conditionValue &&
        item.statMethod
    );

    return isGroupDataValid && isAggregatedDataValid;
  };
  return (
    <>
      <div className="m-auto w-full py-6">
        <div className="flex flex-col gap-[20px]">
          <div className="w-[98vw] border-gray-300 rounded-[5px] shadow-md m-auto my-6">
            <div className="bg-white w-full border border-gray-300 rounded-[5px] py-6 px-[50px] min-h-[700px]">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl">DASHBOARD 수정</div>
                <div className="flex items-center gap-[10px]">
                  <LinkButton path="/" type="back">
                    <img
                      src={back}
                      alt="뒤로가기 아이콘"
                      className="w-[24px] h-[24px]"
                    />
                    <p className="text-black">뒤로</p>
                  </LinkButton>
                  <button
                    onClick={handleSave}
                    disabled={isPending || !isAllFieldsFilled()}
                    className="text-white bg-green-500 shadow-md px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer text-sm hover:bg-green-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <div className="flex gap-[5px] justify-center items-center w-[60px]">
                      <img
                        src={save}
                        alt="저장 아이콘"
                        className="w-[24px] h-[24px]"
                      />
                      <p>저장</p>
                    </div>
                  </button>
                </div>
              </div>
              <DashboardDefaultInfo />
              {currentDashboard && <DashboardDetailInfo />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardEditPage;
