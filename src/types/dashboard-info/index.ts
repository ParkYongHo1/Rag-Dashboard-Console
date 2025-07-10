import {
  DashboardDefaultInfo,
  DashboardDetailInfo,
  DatabaseColumn,
} from "@/stores/dashboardStore";

export interface DashBoardInfoProps {
  mode?: "add" | "edit";
  dashboardId?: string | undefined;
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
  createdAt: string;
  updatedAt: string;
  databaseColumnList: DatabaseColumn[];
  dashboardDefaultInfo: DashboardDefaultInfo;
  dashboardDetailInfo: DashboardDetailInfo;
}
export interface CreateDashboardResponse {
  dashboardId: string;
}
export interface DashboardEditRequest {
  dashboardId: string;
  dashboardDetailInfo: {
    groupData: {
      groupId: number;
      databaseColumn: string;
      databaseColumnAlias: string;
      data: string;
    }[];
    aggregatedData: {
      aggregatedId: number;
      aggregatedDatabaseColumn: string;
      dataType: string;
      databaseColumnAlias: string;
      dashboardCondition: string;
      conditionValue: string;
      statMethod: string;
    }[];
  };
}
