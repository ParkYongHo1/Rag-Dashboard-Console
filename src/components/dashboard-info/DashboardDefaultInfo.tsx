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
import { useCompanyStore } from "@/stores/companyStore";

const DashboardDefaultInfo = ({ mode, dashboardId }: DashBoardInfoProps) => {
  const { company } = useCompanyStore();
  const tableNamesList = company?.tableNamesList || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<DashBoardDefaultInfoForm>({
    mode: "onChange",
    defaultValues: {
      dashboardName: "",
      databaseName: "",
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
        databaseName: info.databaseName,
        dashboardDescription: info.dashboardDescription || "",
      });
    }
  }, [defaultValues, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: dashboardService.createDashboard,
    onSuccess: (response) => {
      console.log(response);
      alert("대시보드가 생성되었습니다.");
    },
    onError: (error) => {
      alert("요청 중 문제가 발생했습니다.");
      console.error(error);
    },
  });

  const onSubmit = async (data: DashBoardDefaultInfoForm) => {
    mutate(data);
  };

  // 저장 버튼 핸들러
  const handleSave = () => {
    handleSubmit(onSubmit)();
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
          <button
            onClick={handleSave}
            disabled={!isValid || isPending}
            className="text-white bg-green-500 shadow-md px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer text-sm hover:bg-green-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
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
        tableNamesList={tableNamesList}
        setValue={setValue}
        watch={watch}
      />
    </>
  );
};

export default DashboardDefaultInfo;
