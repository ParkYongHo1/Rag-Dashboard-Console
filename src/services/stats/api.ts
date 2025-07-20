import { apiClient } from "@/lib/interceptors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const statsService = {
  getStatistics: async (params: {
    dashboardId: string;
    startDate: Date;
    endDate: Date;
  }) => {
    const response = await apiClient.get(`${API_BASE_URL}/api/stat`, {
      params,
    });
    return response.data;
  },
};
