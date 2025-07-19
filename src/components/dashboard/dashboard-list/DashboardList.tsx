import { useState } from "react";
import DashboardListItem from "./DashboardListItem";
import DashboardTooltip from "../../../widgets/DashboardTooltip";
import { DashboardListResponse } from "@/types/dashboard-list";
interface DashboardListComponentProps {
  data: DashboardListResponse;
}
const DashboardList = ({ data }: DashboardListComponentProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  return (
    <>
      <div>
        <div className="text-end mt-[30px] text-sm font-bold px-3">
          총 {data.totalCount}건
        </div>
        <table className="w-full border-collapse mt-4 table-auto">
          <thead>
            <tr className="bg-gray-50 ">
              <th className="border border-gray-300 px-4 py-2 text-center">
                DASHBOARD
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                설명
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                생성일시
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                수정일시
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                <DashboardTooltip
                  handleMouseEnter={() => setTooltipVisible(true)}
                  handleMouseLeave={() => setTooltipVisible(false)}
                  tooltipVisible={tooltipVisible}
                />
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                설정
              </th>
            </tr>
          </thead>
          <tbody>
            {data.dashboardList.map((item) => (
              <DashboardListItem key={item.dashboardId} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DashboardList;
