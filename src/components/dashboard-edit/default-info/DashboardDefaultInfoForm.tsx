import {
  DashBoardDefaultInfoForm,
  DashBoardInfoProps,
} from "@/types/dashboard-info";
import { UseFormRegister } from "react-hook-form";
import { DashboardDefaultFormField } from "./DashboardDefaultFormField";

interface Props extends DashBoardInfoProps {
  register: UseFormRegister<DashBoardDefaultInfoForm>;
}

const DashboardDefaultInfoForm = ({ register }: Props) => {
  return (
    <>
      <DashboardDefaultFormField register={register} />
    </>
  );
};

export default DashboardDefaultInfoForm;
