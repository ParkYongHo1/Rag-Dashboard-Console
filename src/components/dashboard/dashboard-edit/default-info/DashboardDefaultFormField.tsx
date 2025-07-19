import { Input } from "@/shared/ui/Input";
import { DashBoardDefaultInfoForm } from "@/types/dashboard-info";
import { UseFormRegister } from "react-hook-form";
import { DSAHBOARDDEFAULTINFO } from "@/constants/constants";

interface DashboardDefaultFormFieldProps {
  register: UseFormRegister<DashBoardDefaultInfoForm>;
}

export const DashboardDefaultFormField = ({
  register,
}: DashboardDefaultFormFieldProps) => {
  const renderInputField = (name: keyof DashBoardDefaultInfoForm) => {
    return (
      <Input register={register(name)} error={undefined} disabled={true} />
    );
  };

  return (
    <table className="w-full border-collapse mt-4 table-fixed">
      <thead>
        <tr className="bg-gray-50">
          <th className="border border-gray-300 px-4 py-3 font-bold text-center text-gray-600">
            항목 이름
          </th>
          <th className="border border-gray-300 px-4 py-3 font-bold text-center text-gray-600">
            입력 값
          </th>
        </tr>
      </thead>
      <tbody>
        {DSAHBOARDDEFAULTINFO.map(({ label, name }) => (
          <tr key={name}>
            <td className="border border-gray-300 px-4 py-4 font-bold text-gray-600">
              {name !== "dashboardDescription" && (
                <span className="text-red-500">*&nbsp;</span>
              )}
              {label}
            </td>
            <td className="border border-gray-300 px-4 py-4">
              {renderInputField(name)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
