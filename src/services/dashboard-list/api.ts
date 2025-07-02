import { DashboardListResponse } from "../../types/dashboard-list";
import {
  CreateDashboardResponse,
  DashboardDefaultInfoResponse,
} from "@/types/dashboard-info";
import { apiClient } from "@/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const dashboardService = {
  getList: async (params: { page: number; size: number }) => {
    const response = await apiClient.get<DashboardListResponse>(
      `${API_BASE_URL}/api/dashboards`,
      { params }
    );
    console.log(response.data);

    return response.data;
  },
  createDashboard: async (params: {
    dashboardName: string;
    tableName: string;
    dashboardDescription?: string;
  }) => {
    console.log(params);

    const response = await apiClient.post<CreateDashboardResponse>(
      `${API_BASE_URL}/api/dashboard`,
      params
    );
    return response.data;
  },
  getDashboardDefaultInfo: async (params: {
    dashboardId: string;
    status: string;
  }) => {
    const response = await apiClient.get<DashboardDefaultInfoResponse>(
      `${API_BASE_URL}/api/dashboard/${params.dashboardId}`,
      { params }
    );

    return response.data;
  },
};
