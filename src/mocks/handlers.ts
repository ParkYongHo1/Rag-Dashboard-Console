import { http, HttpResponse } from "msw";

const existingDatabaseKEY = new Set<string>(["대시보드 1", "대시보드 2"]);

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
  http.post("/api/dashboards", async ({ request }) => {
    const { databaseName } = (await request.json()) as {
      dashboardName: string;
      databaseName: string;
      dashboardDescription?: string;
    };

    if (!databaseName || databaseName.trim() === "") {
      return HttpResponse.json({
        success: false,
        message: "DATABASE KEY는 필수입니다.",
      });
    }

    if (existingDatabaseKEY.has(databaseName)) {
      return HttpResponse.json({
        success: false,
        message: "이미 존재하는 대시보드입니다.",
      });
    }

    existingDatabaseKEY.add(databaseName);

    return HttpResponse.json({
      success: true,
      message: "대시보드가 성공적으로 생성되었습니다.",
    });
  }),
];
