import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard-list/api";
import { dashboardInfoService } from "@/services/dashboard-info/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useDashboardStore } from "@/stores/dashboardStore";
import { DashboardEditRequest } from "@/types/dashboard-info";

export const useDashboardEdit = () => {
  const { dashboardId } = useParams<{ dashboardId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const statusFromState = location.state?.status;
  const queryClient = useQueryClient();
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
      dashboardId: decodeURIComponent(dashboardId!),
      status: statusFromState ?? "",
    }),
    queryFn: () =>
      dashboardService.getDashboardDefaultInfo({
        dashboardId: decodeURIComponent(dashboardId!),
        status: statusFromState ?? "",
      }),
    enabled: Boolean(dashboardId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: DashboardEditRequest) =>
      dashboardInfoService.updateDashboard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD.READ({
          dashboardId: decodeURIComponent(dashboardId!),
          status: statusFromState ?? "",
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD.LIST({ page: 1, size: 10 }),
      });
      alert("대시보드가 수정되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      alert("요청 중 문제가 발생했습니다.");
      console.error(error);
    },
  });

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: (params: { dashboardId: string }) =>
      dashboardInfoService.deleteDashboard(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD.LIST({ page: 1, size: 10 }),
      });
      alert("대시보드가 삭제되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      alert("삭제 중 문제가 발생했습니다.");
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

  const isAllFieldsFilled = () => {
    if (groupItems.length === 0 || aggregatedItems.length === 0) {
      return false;
    }
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

  const handleSave = () => {
    const dashboardDetailInfo = createDashboardDetailInfo();

    const requestData: DashboardEditRequest = {
      dashboardId: dashboardId!,
      dashboardDetailInfo,
    };

    mutate(requestData);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm("대시보드를 삭제하시겠습니까?");

    if (isConfirmed && dashboardId) {
      deleteMutate({ dashboardId: decodeURIComponent(dashboardId) });
    }
  };

  return {
    isLoading,
    currentDashboard,
    isPending,
    isDeletePending,
    isAllFieldsFilled,
    handleSave,
    handleDelete,
  };
};
