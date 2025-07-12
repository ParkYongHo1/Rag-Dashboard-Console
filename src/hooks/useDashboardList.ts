import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { dashboardService } from "@/services/dashboard-list/api";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useDashboardList = (pageSize: number = 10) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.LIST({ page, size: pageSize }),
    queryFn: () => dashboardService.getList({ page, size: pageSize }),
    placeholderData: (previousData) => previousData,
  });

  return {
    data,
    isLoading,
    error,
    page,
    setPage,
    pageSize,
    refetch,
  };
};
