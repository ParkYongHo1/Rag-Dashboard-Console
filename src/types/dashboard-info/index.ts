export interface DashBoardInfoProps {
  mode: "add" | "edit";
  dashboardId?: string;
}

export interface DashBoardDefaultInfoForm {
  dashboardName: string;
  databaseName: string;
  dashboardDescription?: string;
}
export interface DashboardDefaultInfoItem {
  dashboardDefaultInfo: {
    dashboardName: string;
    databaseName: string;
    dashboardDescription?: string;
  };
}
export interface DashboardDefaultInfoResponse {
  dashboardDefaultInfo: {
    dashboardName: string;
    databaseName: string;
    dashboardDescription?: string;
  };
}
export interface CreateDashboardResponse {
  dashboardId: string;
}
