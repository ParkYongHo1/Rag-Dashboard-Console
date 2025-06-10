import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/test", () => {
    return HttpResponse.json({
      success: true,
      message: "Hello MSW!",
    });
  }),

  http.get("/api/dashboards", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const size = Number(url.searchParams.get("size")) || 10;

    const allDashboards = Array.from({ length: 20 }, (_, i) => ({
      id: `dashboard-${i + 1}`,
      dashboardName: `대시보드 ${i + 1}`,
      dashboardDescription: `대시보드 ${i + 1} 설명입니다.`,
      createdAt: "2025-06-01",
      updatedAt: "2025-06-10",
      status: i % 2 === 0 ? "CREATED" : "COMPLETED",
    }));

    const start = (page - 1) * size;
    const pagedDashboards = allDashboards.slice(start, start + size);

    return HttpResponse.json({
      success: true,
      data: {
        total: allDashboards.length,
        page,
        size,
        dashboards: pagedDashboards,
      },
    });
  }),
];
