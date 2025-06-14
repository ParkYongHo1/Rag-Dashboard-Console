import { DashBoardInfoProps } from "@/types/dashboard-info";

const DashboardDefaultInfoTitle = ({ mode }: DashBoardInfoProps) => {
  return (
    <>
      <p className="font-bold text-lg">기본 정보</p>
      <p className="font-semibold text-red-500 text-sm my-2">
        {mode === "add"
          ? "* 모든 기본 정보를 입력 후 조회하기 버튼을 눌러주세요."
          : "* 생성한 대시보드에 대한 기본 정보입니다."}
      </p>
    </>
  );
};
export default DashboardDefaultInfoTitle;
