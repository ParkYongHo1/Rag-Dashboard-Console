import { DashBoardDefaultInfoForm } from "@/types/dashboard-info";

export const DSAHBOARDDEFAULTINFO: {
  label: string;
  name: keyof DashBoardDefaultInfoForm;
}[] = [
  { label: "대시보드 명칭", name: "dashboardName" },
  { label: "TABLE NAME", name: "tableName" },
  { label: "대시보드 설명", name: "dashboardDescription" },
];

export const METHOD = [
  { value: "개수", label: "개수 (COUNT)" },
  { value: "합계", label: "합계 (SUM)" },
  { value: "평균", label: "평균 (AVG)" },
];
