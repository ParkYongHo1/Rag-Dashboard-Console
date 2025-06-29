export interface DashboardItem {
  dashboardId: string;
  companyNum: number;
  dashboardName: string;
  dashboardDescription: string;
  createdAt: string;
  updatedAt: string;
  dashboardStatus: "CREATED" | "COMPLETED";
}

export interface DashboardListResponse {
  totalPages: number;
  totalCount: number;
  currentPage: number;
  dashboardList: DashboardItem[];
}
