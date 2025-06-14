export interface DashboardItem {
  dashboardId: string;
  dashboardName: string;
  dashboardDescription: string;
  createdAt: string;
  updatedAt: string;
  status: "CREATED" | "COMPLETED";
}

export interface DashboardListResponse {
  total: number;
  page: number;
  size: number;
  dashboards: DashboardItem[];
}
