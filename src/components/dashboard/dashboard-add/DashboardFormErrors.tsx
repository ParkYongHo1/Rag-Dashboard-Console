import { FieldErrors } from "react-hook-form";
import { DashBoardDefaultInfoForm } from "@/types/dashboard-info";

interface DashboardFormErrorsProps {
  errors: FieldErrors<DashBoardDefaultInfoForm>;
}

export const DashboardFormErrors = ({ errors }: DashboardFormErrorsProps) => {
  if (!errors.dashboardName?.message && !errors.tableName?.message) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-red-500 text-sm">
        {errors.dashboardName?.message || errors.tableName?.message}
      </p>
    </div>
  );
};
