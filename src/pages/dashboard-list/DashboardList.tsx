import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { dashboardService } from "@/services/dashboard-list/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { LinkButton } from "@/shared/ui/LinkButton";
import DashboardListItem from "@/components/dashboard-list/DashboardListItem";
import DashboardTooltip from "@/components/dashboard-list/DashboardTooltip";

import Pagination from "@/components/dashboard-list/Pagination";

const DashboardList = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [page, setPage] = useState(1);
  const size = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.LIST({ page, size }),
    queryFn: () => dashboardService.getList({ page, size }),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !data) return <p className="p-4">에러가 발생했어요 😢</p>;

  const totalPages = Math.ceil(data.total / size);
  return (
    <div className="m-auto w-full h-[90vh] py-6">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[98vw] border-gray-300 rounded-[5px] shadow-md m-auto">
          <div className="bg-white w-full border border-gray-300 rounded-[5px] py-6 px-[50px] min-h-[800px] max-h-[800px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <div className="text-2xl">DASHBOARD LIST</div>
                <LinkButton name="+ New" path="/add-dashboard" type="button" />
              </div>
              <div className="text-end mt-[30px] text-sm font-bold px-3">
                총 {data.total}건
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
                  {data.dashboards.map((item) => (
                    <DashboardListItem
                      key={item.dashboardId}
                      item={item}
                      mode="dashboardList"
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardList;
