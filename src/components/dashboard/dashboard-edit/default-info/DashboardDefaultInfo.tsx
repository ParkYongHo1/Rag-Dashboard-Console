import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DashBoardDefaultInfoForm } from "@/types/dashboard-info";
import { useDashboardStore } from "@/stores/dashboardStore";
import DashboardDefaultInfoTitle from "@/widgets/dashboard-info/DashBoardDefaultInfoTitle";
import DashboardDefaultInfoForm from "./DashboardDefaultInfoForm";

const DashboardDefaultInfo = () => {
  const { currentDashboard } = useDashboardStore();

  const { register, reset } = useForm<DashBoardDefaultInfoForm>({
    mode: "onChange",
    defaultValues: {
      dashboardName: "",
      tableName: "",
      dashboardDescription: "",
    },
  });

  useEffect(() => {
    if (currentDashboard?.dashboardDefaultInfo) {
      const info = currentDashboard.dashboardDefaultInfo;
      reset({
        dashboardName: info.dashboardName,
        tableName: info.tableName,
        dashboardDescription: info.dashboardDescription || "",
      });
    }
  }, [currentDashboard, reset]);

  return (
    <>
      <DashboardDefaultInfoTitle mode="edit" />
      <DashboardDefaultInfoForm register={register} />
    </>
  );
};

export default DashboardDefaultInfo;
