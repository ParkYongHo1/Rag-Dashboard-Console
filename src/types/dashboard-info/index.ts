export interface DashBoardInfoProps {
  mode: "add" | "edit";
}

export interface DashBoardInfoForm {
  dashboardName: string;
  databaseName: string;
  dashboardDescription?: string;
}
