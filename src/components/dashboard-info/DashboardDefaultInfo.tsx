import back from "@/assets/dashboard-info/back.svg";
import save from "@/assets/dashboard-info/save.svg";
import { dashboardService } from "@/services/dashboard-list/api";
import { LinkButton } from "@/shared/ui/LinkButton";
import {
  DashBoardDefaultInfoForm,
  DashBoardInfoProps,
} from "@/types/dashboard-info";
import DashboardDefaultInfoTitle from "@/widgets/dashboard-info/DashBoardDefaultInfoTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import DashboardDefaultInfoForm from "./DashboardDefaultInfoForm";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/constants/queryKeys";

const DashboardDefaultInfo = ({ mode, dashboardId }: DashBoardInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<DashBoardDefaultInfoForm>({
    mode: "onChange",
    defaultValues: {
      dashboardName: "",
      databaseKey: "",
      dashboardDescription: "",
    },
  });
  const { data: defaultValues } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.READ(dashboardId!),
    queryFn: () =>
      dashboardService.getDashboardDefaultInfo({ dashboardId: dashboardId! }),
    enabled: mode === "edit" && Boolean(dashboardId),
  });

  useEffect(() => {
    if (defaultValues?.dashboardDefaultInfo) {
      const info = defaultValues.dashboardDefaultInfo;
      reset({
        dashboardName: info.dashboardName,
        databaseKey: info.databaseKey,
        dashboardDescription: info.dashboardDescription || "",
      });
    }
  }, [defaultValues, reset]);

  const { mutate } = useMutation({
    mutationFn: dashboardService.createDashboard,
    onSuccess: (response) => {
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
  const onSubmit = async (data: DashBoardDefaultInfoForm) => {
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
      <DashboardDefaultInfoTitle mode={mode} />
      <DashboardDefaultInfoForm
        mode={mode}
        register={register}
        errors={errors}
        isValid={isValid}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default DashboardDefaultInfo;
