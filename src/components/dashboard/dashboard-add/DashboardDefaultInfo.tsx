import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import back from "@/assets/dashboard-info/back.svg";
import save from "@/assets/dashboard-info/save.svg";
import { dashboardService } from "@/services/dashboard-list/api";
import { LinkButton } from "@/shared/ui/LinkButton";
import { DashBoardDefaultInfoForm } from "@/types/dashboard-info";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useCompanyStore } from "@/stores/companyStore";
import DashboardDefaultInfoTitle from "@/widgets/dashboard-info/DashBoardDefaultInfoTitle";
import DashboardDefaultInfoForm from "./DashboardDefaultInfoForm";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
const DashboardDefaultInfo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentDashboard } = useDashboardStore();
  const { company } = useCompanyStore();

  const tableNamesList = company?.tableNamesList || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
    trigger,
  } = useForm<DashBoardDefaultInfoForm>({
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

  const { mutate, isPending } = useMutation({
    mutationFn: dashboardService.createDashboard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.DASHBOARD.LIST({ page: 1, size: 10 }),
      });
      alert("대시보드가 생성되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      alert("요청 중 문제가 발생했습니다.");
      console.error(error);
    },
  });

  const onSubmit = async (data: DashBoardDefaultInfoForm) => {
    mutate(data);
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };
  if (isPending)
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="대시보드 생성중입니다...."
      />
    );
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl">DASHBOARD 생성</div>
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
      <DashboardDefaultInfoTitle mode="add" />
      <DashboardDefaultInfoForm
        register={register}
        errors={errors}
        isValid={isValid}
        onSubmit={handleSubmit(onSubmit)}
        tableNamesList={tableNamesList}
        setValue={setValue}
        watch={watch}
        trigger={trigger}
      />
    </>
  );
};

export default DashboardDefaultInfo;
