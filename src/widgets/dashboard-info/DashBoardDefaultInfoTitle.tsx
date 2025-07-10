import { DashBoardInfoProps } from "@/types/dashboard-info";

const DashboardDefaultInfoTitle = ({ mode }: DashBoardInfoProps) => {
  return (
    <>
      <p className="text-lg">대시보드 기본 정보</p>
      <p className="text-red-500 text-xs my-2">
        {mode === "add"
          ? "* 기본 정보를 입력 후 저장 버튼을 눌러주세요."
          : "* 생성한 대시보드에 대한 기본 정보입니다."}
      </p>
    </>
  );
};
export default DashboardDefaultInfoTitle;
