import {
  DashBoardDefaultInfoForm,
  DashBoardInfoProps,
  DashBoardDefaultInfoForm as FormType,
} from "@/types/dashboard-info";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  UseFormTrigger,
} from "react-hook-form";
import { DashboardDefaultFormField } from "./DashboardDefaultInfoFormField";
import { DashboardFormErrors } from "./DashboardFormErrors";

interface Props extends DashBoardInfoProps {
  register: UseFormRegister<DashBoardDefaultInfoForm>;
  errors: FieldErrors<DashBoardDefaultInfoForm>;
  isValid: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  tableNamesList: string[];
  setValue: UseFormSetValue<FormType>;
  watch: UseFormWatch<FormType>;
  trigger: UseFormTrigger<FormType>;
}

const DashboardDefaultInfoForm = ({
  register,
  errors,
  onSubmit,
  tableNamesList,
  setValue,
  watch,
  trigger,
}: Props) => {
  const selectedDatabase = watch("tableName");

  const handleDatabaseChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValue("tableName", e.target.value);
    await trigger("tableName");
  };

  return (
    <form onSubmit={onSubmit}>
      <DashboardDefaultFormField
        mode="add"
        register={register}
        tableNamesList={tableNamesList}
        selectedDatabase={selectedDatabase}
        onDatabaseChange={handleDatabaseChange}
      />
      <DashboardFormErrors errors={errors} />
    </form>
  );
};

export default DashboardDefaultInfoForm;
