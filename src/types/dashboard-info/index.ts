export interface DashBoardInfoProps {
  mode: "add" | "edit";
  dashboardId?: string;
}

export interface DashBoardDefaultInfoForm {
  dashboardName: string;
  databaseKey: string;
  dashboardDescription?: string;
}
export interface DashboardDefaultInfoItem {
  dashboardDefaultInfo: {
    dashboardName: string;
    databaseKey: string;
    dashboardDescription?: string;
  };
}
export interface DashboardDefaultInfoResponse {
  dashboardDefaultInfo: {
    dashboardName: string;
    databaseKey: string;
    dashboardDescription?: string;
  };
}
