import { DSAHBOARDDEFAULTINFO } from "@/constants/constants";
import { Input } from "@/shared/ui/Input";
import {
  DashBoardDefaultInfoForm,
  DashBoardInfoProps,
} from "@/types/dashboard-info";
import { FieldErrors, UseFormRegister } from "react-hook-form";
interface Props extends DashBoardInfoProps {
  register: UseFormRegister<DashBoardDefaultInfoForm>;
  errors: FieldErrors<DashBoardDefaultInfoForm>;
  isValid: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const DashboardDefaultInfoForm = ({
  mode,
  register,
  errors,
  isValid,
  onSubmit,
}: Props) => {
  return (
    <>
      <form onSubmit={onSubmit}>
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
                  <span className="text-red-500">*&nbsp;</span>
                  {label}
                </td>
                <td className="border border-gray-300 px-4 py-4">
                  <Input
                    register={register(name, {
                      required:
                        name === "dashboardDescription"
                          ? false
                          : `${label}은(는) 필수 입력입니다.`,
                    })}
                    error={errors[name]}
                    placeholder={`${label}을(를) 입력해주세요`}
                    disabled={mode === "edit"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mode === "add" && (
          <div className="flex justify-between my-4 items-center">
            <p className="text-red-500 text-sm mr-4">
              {errors.dashboardName?.message || errors.databaseKey?.message}
            </p>
            {!isValid && (
              <button
                type="submit"
                className="h-[36px] text-white bg-blue-500 shadow-md px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer text-sm hover:bg-blue-600 transition duration-200"
              >
                <div className="w-[60px]">
                  <p>조회하기</p>
                </div>
              </button>
            )}
          </div>
        )}
      </form>
    </>
  );
};
export default DashboardDefaultInfoForm;
