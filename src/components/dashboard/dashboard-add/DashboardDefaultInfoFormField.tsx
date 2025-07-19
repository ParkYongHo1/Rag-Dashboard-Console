import { Input } from "@/shared/ui/Input";
import { DashBoardDefaultInfoForm } from "@/types/dashboard-info";
import { UseFormRegister } from "react-hook-form";
import { DSAHBOARDDEFAULTINFO } from "@/constants/constants";

interface DashboardDefaultFormFieldProps {
  mode: "add" | "edit";
  register: UseFormRegister<DashBoardDefaultInfoForm>;
  tableNamesList: string[];
  selectedDatabase: string;
  onDatabaseChange: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>;
}

export const DashboardDefaultFormField = ({
  mode,
  register,
  tableNamesList,
  selectedDatabase,
  onDatabaseChange,
}: DashboardDefaultFormFieldProps) => {
  const renderInputField = (
    name: keyof DashBoardDefaultInfoForm,
    label: string
  ) => {
    if (name === "tableName") {
      if (mode !== "edit") {
        return (
          <select
            {...register(name, {
              required: `${label}은(는) 필수 선택입니다.`,
            })}
            value={selectedDatabase || ""}
            onChange={onDatabaseChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">테이블을 선택해주세요</option>
            {tableNamesList?.map((tableName) => (
              <option key={tableName} value={tableName}>
                {tableName}
              </option>
            ))}
          </select>
        );
      }

      return (
        <>
          <Input register={register(name)} error={undefined} disabled={true} />
        </>
      );
    }

    return (
      <Input
        register={register(name, {
          required:
            name === "dashboardDescription"
              ? false
              : `${label}은(는) 필수 입력입니다.`,
        })}
        error={undefined}
        placeholder={`${label}을(를) 입력해주세요`}
        disabled={mode === "edit"}
      />
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
              {renderInputField(name, label)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
