import { DashBoardDefaultInfoForm } from "@/types/dashboard-info";

export const DSAHBOARDDEFAULTINFO: {
  label: string;
  name: keyof DashBoardDefaultInfoForm;
}[] = [
  { label: "대시보드 명칭", name: "dashboardName" },
  { label: "DATABASE KEY", name: "databaseKey" },
  { label: "대시보드 설명", name: "dashboardDescription" },
];
