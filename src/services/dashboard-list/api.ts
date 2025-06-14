import axios from "axios";
import { BaseResponse } from "@/types/common";
import { DashboardListResponse } from "../../types/dashboard-list";
import { DashboardDefaultInfoResponse } from "@/types/dashboard-info";

export const dashboardService = {
  getList: async (params: { page: number; size: number }) => {
    const response = await axios.get<BaseResponse<DashboardListResponse>>(
      "/api/dashboards",
      { params }
    );
    return response.data.data;
  },
  createDashboard: async (params: {
    dashboardName: string;
    databaseKey: string;
    dashboardDescription?: string;
  }) => {
    console.log(params);

    const response = await axios.post<BaseResponse>("/api/dashboards", params);
    return response.data.success;
  },
  getDashboardDefaultInfo: async (params: { dashboardId: string }) => {
    const response = await axios.get<DashboardDefaultInfoResponse>(
      `/api/dashboard-default-info/${params.dashboardId}`,
      { params }
    );

    return response.data;
  },
};
