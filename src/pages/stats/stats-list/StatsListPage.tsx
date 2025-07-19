import Pagination from "@/components/dashboard/dashboard-list/Pagination";
import NoDashboardListItem from "@/widgets/NoDashboardListItem";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

import { useDashboardList } from "@/hooks/useDashboardList";
import ErrorPage from "@/pages/common/ErrorPage";
import StatsList from "@/components/stats/stats-list/StatsList";

const StatsListPage = () => {
  const { data, isLoading, error, setPage, refetch } = useDashboardList(10);

  if (isLoading)
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="대시보드 정보를 불러오는 중입니다..."
      />
    );

  if (error || !data) {
    return (
      <ErrorPage
        title="대시보드 목록을 불러올 수 없습니다"
        message="대시보드 정보를 가져오는 중에 문제가 발생했습니다."
        error={error}
        onRetry={() => refetch()}
      />
    );
  }

  const filteredDashboardList = data.dashboardList.filter(
    (item) => item.dashboardStatus === "COMPLETED"
  );

  const filteredData = {
    ...data,
    dashboardList: filteredDashboardList,
    totalCount: filteredDashboardList.length,
  };

  return (
    <div className="m-auto w-full h-[90vh] py-6">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[98vw] border-gray-300 rounded-[5px] shadow-md m-auto">
          <div className="bg-white w-full border border-gray-300 rounded-[5px] py-6 px-[50px] min-h-[800px] max-h-[800px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-2xl">
                  <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-lg font-semibold border border-green-200">
                    통계
                  </span>
                  <span className="text-gray-700">DASHBOARD</span>
                </div>
              </div>
              {filteredData.dashboardList.length > 0 ? (
                <StatsList filteredData={filteredData} />
              ) : (
                <NoDashboardListItem />
              )}
            </div>
            {filteredData.totalCount > 10 && (
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

export default StatsListPage;
