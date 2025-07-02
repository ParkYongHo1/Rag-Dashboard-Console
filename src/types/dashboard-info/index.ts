export interface DashBoardInfoProps {
  mode: "add" | "edit";
  dashboardId?: string;
}

export interface DashBoardDefaultInfoForm {
  dashboardName: string;
  tableName: string;
  dashboardDescription?: string;
}
export interface DashboardDefaultInfoItem {
  dashboardDefaultInfo: {
    dashboardName: string;
    tableName: string;
    dashboardDescription?: string;
  };
}
export interface DashboardDefaultInfoResponse {
  dashboardDefaultInfo: {
    dashboardName: string;
    tableName: string;
    dashboardDescription?: string;
  };
}
export interface CreateDashboardResponse {
  dashboardId: string;
}
