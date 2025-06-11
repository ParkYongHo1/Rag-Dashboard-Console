import back from "@/assets/dashboard-info/back.svg";
import save from "@/assets/dashboard-info/save.svg";
import { dashboardService } from "@/services/dashboard-list/api";
import { Input } from "@/shared/ui/Input";
import { LinkButton } from "@/shared/ui/LinkButton";
import { DashBoardInfoForm, DashBoardInfoProps } from "@/types/dashboard-info";
import DashBoardDefaultInfoTitle from "@/widgets/dashboard-info/DashBoardDefaultInfoTitle";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const ROWS: { label: string; name: keyof DashBoardInfoForm }[] = [
  { label: "대시보드 명칭", name: "dashboardName" },
  { label: "DATABASE KEY", name: "databaseName" },
  { label: "대시보드 설명", name: "dashboardDescription" },
];
const DashBoardDefaultInfo = ({ mode }: DashBoardInfoProps) => {
  const isValid = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DashBoardInfoForm>();
  const { mutate } = useMutation({
    mutationFn: dashboardService.createDashboard,
    onSuccess: (response) => {
      console.log(response);

      if (response === true) {
        alert("대시보드가 생성되었습니다.");
      } else {
        alert("존재하는 데이터베이스가 없습니다.");
      }
    },
    onError: (error) => {
      alert("요청 중 문제가 발생했습니다.");
      console.error(error);
    },
  });
  const onSubmit = async (data: DashBoardInfoForm) => {
    mutate(data);
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl">
          DASHBOARD {mode === "add" ? "생성" : "수정"}
        </div>
        <div className="flex items-center gap-[10px]">
          <LinkButton path="/" type="back">
            <img
              src={back}
              alt="뒤로가기 아이콘"
              className="w-[24px] h-[24px]"
            />
            <p className="text-black">뒤로</p>
          </LinkButton>
          <button className="text-white bg-green-500 shadow-md px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer text-sm hover:bg-green-600 transition duration-200">
            <div className="flex gap-[5px] justify-center items-center w-[60px]">
              <img src={save} alt="저장 아이콘" className="w-[24px] h-[24px]" />
              <p>저장</p>
            </div>
          </button>
        </div>
      </div>
      <DashBoardDefaultInfoTitle mode={mode} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {ROWS.map(({ label, name }) => (
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
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between my-4 items-center">
          <p className="text-red-500 text-sm mr-4"></p>
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
      </form>
    </>
  );
};

export default DashBoardDefaultInfo;
