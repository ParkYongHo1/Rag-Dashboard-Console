import { apiClient } from "@/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const dashboardInfoService = {
  updateDashboard: async (params: {
    dashboardId: string;
    dashboardDetailInfo: {
      groupData: {
        groupId: number;
        databaseColumn: string;
        databaseColumnAlias: string;
        data: string;
      }[];
      aggregatedData: {
        aggregatedId: number;
        aggregatedDatabaseColumn: string;
        dataType: string;
        databaseColumnAlias: string;
        dashboardCondition: string;
        conditionValue: string;
        statMethod: string;
      }[];
    };
  }) => {
    const response = await apiClient.patch(
      `${API_BASE_URL}/api/dashboard`,
      params
    );
    console.log(params);

    return response.data;
  },
};
