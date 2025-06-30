import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { dashboardService } from "@/services/dashboard-list/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { LinkButton } from "@/shared/ui/LinkButton";

import Pagination from "@/components/dashboard-list/Pagination";
import { useCompanyStore } from "@/stores/companyStore";
import DashboardList from "@/components/dashboard-list/DashboardList";
import NoDashboardListItem from "@/components/dashboard-list/NoDashboardListItem";

const DashboardListPage = () => {
  const [page, setPage] = useState(1);
  const size = 10;
  const company = useCompanyStore((state) => state.accessToken);
  console.log(company);

  const { data, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.LIST({ page, size }),
    queryFn: () => dashboardService.getList({ page, size }),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <p className="p-4">로딩 중...</p>;
  if (error || !data) return <p className="p-4">에러가 발생했어요 😢</p>;

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

              {data.totalCount > 0 ? (
                <DashboardList data={data} />
              ) : (
                <NoDashboardListItem />
              )}
            </div>
            {data.totalPages > 0 && (
              <Pagination
                currentPage={data.currentPage}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardListPage;
