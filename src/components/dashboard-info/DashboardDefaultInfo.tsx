// components/dashboard-info/DashboardDefaultInfo.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import back from "@/assets/dashboard-info/back.svg";
import save from "@/assets/dashboard-info/save.svg";
import { dashboardService } from "@/services/dashboard-list/api";
import { LinkButton } from "@/shared/ui/LinkButton";
import {
  DashBoardDefaultInfoForm,
  DashBoardInfoProps,
} from "@/types/dashboard-info";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useCompanyStore } from "@/stores/companyStore";
import DashboardDefaultInfoTitle from "@/widgets/dashboard-info/DashBoardDefaultInfoTitle";
import DashboardDefaultInfoForm from "./DashboardDefaultInfoForm";

const DashboardDefaultInfo = ({ mode }: DashBoardInfoProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const statusFromUrl = searchParams.get("status");

  // Zustand store에서 데이터 가져오기
  const { currentDashboard } = useDashboardStore();
  const { company } = useCompanyStore();

  // 테이블 이름 리스트 (기존 로직 유지 또는 store에서 가져오기)
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

  // Zustand store의 데이터로 폼 초기화
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
      navigate("/", { replace: true });
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

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl">
          DASHBOARD {mode === "add" ? "생성" : "수정"}
          {statusFromUrl && (
            <span className="text-sm text-gray-500 ml-2">
              ({statusFromUrl})
            </span>
          )}
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
        trigger={trigger}
      />
    </>
  );
};

export default DashboardDefaultInfo;
