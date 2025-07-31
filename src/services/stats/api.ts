// import { apiClient } from "@/lib/interceptors";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const statsService = {
  getStatistics: async (params: {
    dashboardId: string;
    selectGroupData: string;
    startDate: Date;
    endDate: Date;
  }) => {
    // 더미 데이터 반환 (API 문제로 인한 임시 처리)
    console.log(params.selectGroupData);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          groupDataList: [2, 1, 1],
        });
      }, 500); // 0.5초 지연으로 실제 API 호출을 시뮬레이션
    });

    //   const startDateStr = params.startDate.toISOString();
    //   const endDateStr = params.endDate.toISOString();

    //   const url = `${API_BASE_URL}/api/filterGroupData?dashboardId=${decodeURIComponent(
    //     params.dashboardId
    //   )}&selectGroupData=${encodeURIComponent(
    //     params.selectGroupData
    //   )}&startDate=${startDateStr}&endDate=${endDateStr}`;

    //   const response = await apiClient.get(url);
    //   return response.data;
  },
};
