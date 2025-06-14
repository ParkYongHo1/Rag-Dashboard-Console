import { http, HttpResponse } from "msw";

const existingDatabaseKEY = new Set<string>(["대시보드 1", "대시보드 2"]);
const existingDashboardId = new Set<string>(["dashboard-1", "dashboard-2"]);

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
      dashboardId: `dashboard-${i + 1}`,
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
    const { databaseKey } = (await request.json()) as {
      dashboardName: string;
      databaseKey: string;
      dashboardDescription?: string;
    };

    if (!existingDatabaseKEY.has(databaseKey)) {
      return HttpResponse.json({
        success: false,
        message: "존재하지 않는 데이터베이스입니다.",
      });
    }

    existingDatabaseKEY.add(databaseKey);

    return HttpResponse.json({
      success: true,
      message: "대시보드가 성공적으로 생성되었습니다.",
    });
  }),

  http.get("/api/dashboard-default-info/:dashboardId", ({ params }) => {
    const { dashboardId } = params;

    if (!existingDashboardId.has(dashboardId as string)) {
      return HttpResponse.json(
        {
          success: false,
          message: "존재하지 않는 대시보드입니다.",
        },
        { status: 404 }
      );
    }

    const response = {
      dashboardDefaultInfo: {
        dashboardName: `대시보드 ${dashboardId}`,
        databaseKey: "test1",
        dashboardDescription: `대시보드 ${dashboardId} 설명입니다.`,
      },
    };

    return HttpResponse.json(response);
  }),
];
