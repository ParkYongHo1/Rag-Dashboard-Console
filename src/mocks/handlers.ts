import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/test", () => {
    return HttpResponse.json({
      success: true,
      message: "Hello MSW!",
    });
  }),

  http.get("/api/dashboards", () => {
    return HttpResponse.json({
      success: true,
      data: {
        total: 2,
        page: 1,
        size: 10,
        dashboards: [
          {
            id: "test123",
            dashboardName: "대시보드 이름",
            dashboardDescription: "대시보드 설명",
            createdAt: "2025-06-09",
            updatedAt: "-",
            status: "CREATED",
          },
          {
            id: "test124",
            dashboardName: "주간 리포트",
            dashboardDescription: "주간 리포트용 대시보드입니다.",
            createdAt: "2025-06-01",
            updatedAt: "2025-06-08",
            status: "COMPLETED",
          },
        ],
      },
    });
  }),
];
