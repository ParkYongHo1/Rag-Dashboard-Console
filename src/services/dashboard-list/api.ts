import axios from "axios";
import { BaseResponse } from "@/types/common";
import { DashboardListResponse } from "../../types/dashboard-list";

export const dashboardService = {
  getList: async (params: { page: number; size: number }) => {
    const response = await axios.get<BaseResponse<DashboardListResponse>>(
      "/api/dashboards",
      { params }
    );
    return response.data.data;
  },
};
