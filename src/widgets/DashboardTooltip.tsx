import help from "@/assets/dashboard-list/help.svg";

interface TooltipProps {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  tooltipVisible: boolean;
}

const DashboardTooltip = ({
  handleMouseEnter,
  handleMouseLeave,
  tooltipVisible,
}: TooltipProps) => {
  return (
    <>
      <div className="flex justify-center gap-[4px] items-center relative">
        <span className="">상태</span>
        <div
          className="flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={help}
            alt="안내 아이콘"
            className="w-[18px] h-[18px] object-contain mt-[1px] cursor-pointer"
            style={{ transform: "rotate(180deg)" }}
          />
          {tooltipVisible && (
            <div className="absolute w-68 text-xs bg-gray-700 text-white rounded-md p-2 shadow-md z-20 -top-16 left-1/2 transform -translate-x-1/2">
              <p>
                <span className="text-red-500">CREATED</span> : 추가 정보 입력이
                필요한 상태
              </p>
              <p>
                <span className="text-green-500">COMPLETED</span> : 모든 정보가
                입력된 상태
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default DashboardTooltip;
