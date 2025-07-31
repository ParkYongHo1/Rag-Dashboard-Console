import DonutChartComponent from "@/components/stats/chart/DonutChartComponent";
import StatsHeader from "@/components/stats/stats-item/stats-header/StatsHeader";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { dashboardService } from "@/services/dashboard-list/api";
import { statsService } from "@/services/stats/api";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import Select from "@/shared/ui/Select";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

type ChartType = "donut" | "bar" | "line" | "area";

const chartTypeOptions = [
  { value: "donut", label: "도넛 차트" },
  { value: "bar", label: "막대 차트" },
  { value: "line", label: "라인 차트" },
  { value: "area", label: "영역 차트" },
];

const getInitialDateRange = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 30);

  return {
    startDate,
    endDate: today,
  };
};

const StatsItemPage = () => {
  const [rowChartType, setRowChartType] = useState<ChartType>("donut");
  const [rowItem, setRowItem] = useState<string>("");
  const [dateRange, setDateRange] = useState(getInitialDateRange());

  const { dashboardId } = useParams<{ dashboardId: string }>();

  const { data: dashboardData } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.READ({
      dashboardId: decodeURIComponent(dashboardId!),
      status: "COMPLETED",
    }),
    queryFn: () =>
      dashboardService.getDashboardDefaultInfo({
        dashboardId: decodeURIComponent(dashboardId!),
        status: "COMPLETED",
      }),
    enabled: Boolean(dashboardId),
  });
  console.log(
    Array.isArray(dashboardData?.dashboardDetailInfo.groupData)
      ? dashboardData.dashboardDetailInfo.groupData.map(
          (item) => item.databaseColumnAlias
        )
      : []
  );

  const groupItemOptions = useMemo(() => {
    if (!Array.isArray(dashboardData?.dashboardDetailInfo.groupData)) return [];

    const seen = new Set<string>();
    return dashboardData.dashboardDetailInfo.groupData
      .filter((item) => {
        if (seen.has(item.databaseColumn)) return false;
        seen.add(item.databaseColumn);
        return true;
      })
      .map((item) => ({
        value: item.databaseColumn,
        label: item.databaseColumnAlias,
      }));
  }, [dashboardData?.dashboardDetailInfo.groupData]);

  useEffect(() => {
    if (groupItemOptions && groupItemOptions.length > 0) {
      setRowItem(groupItemOptions[0].value);
    }
  }, [groupItemOptions]);

  type FilterData = {
    groupDataList: number[];
  };

  const { data: filterData, refetch: refetchFilterData } =
    useQuery<FilterData | null>({
      queryKey: QUERY_KEYS.STATISTICS.GET({
        dashboardId: decodeURIComponent(dashboardId!),
        selectGroupData: rowItem,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
      queryFn: async (): Promise<FilterData | null> => {
        if (!dashboardId || !rowItem) return null;

        return (await statsService.getStatistics({
          dashboardId: decodeURIComponent(dashboardId),
          selectGroupData: rowItem,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        })) as FilterData | null;
      },
      enabled: Boolean(dashboardId && rowItem),
    });

  const chartData = useMemo(() => {
    if (!filterData?.groupDataList) return [];

    const columnAliases = Array.isArray(
      dashboardData?.dashboardDetailInfo.groupData
    )
      ? dashboardData.dashboardDetailInfo.groupData.map(
          (item) => item.databaseColumnAlias
        )
      : [];

    return filterData.groupDataList.map((value: number, index: number) => ({
      name: columnAliases[index] || `항목 ${index + 1}`,
      value: value,
    }));
  }, [filterData, dashboardData?.dashboardDetailInfo.groupData]);

  useEffect(() => {
    if (dashboardId && rowItem) {
      refetchFilterData();
    }
  }, [rowItem, refetchFilterData, dashboardId]);

  const handleRowItemChange = (newRowItem: string) => {
    setRowItem(newRowItem);
  };

  const handleDateChange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate });
  };

  const renderChart = () => {
    if (!filterData) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <LoadingSpinner
            size="xl"
            color="blue"
            text="통계 데이터를 불러오는 중입니다..."
          />
        </div>
      );
    }

    switch (rowChartType) {
      case "donut":
        return <DonutChartComponent data={chartData} />;
      case "bar":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">막대 차트 (개발 예정)</p>
          </div>
        );
      case "line":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">라인 차트 (개발 예정)</p>
          </div>
        );
      case "area":
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">영역 차트 (개발 예정)</p>
          </div>
        );
      default:
        return <DonutChartComponent data={chartData} />;
    }
  };

  return (
    <div className="min-h-[85vh] bg-white mb-[20px]">
      <div className="px-6 mt-[20px]">
        <StatsHeader
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <h3 className="text-lg font-semibold text-gray-700">
                그룹항목 통계
              </h3>
              <h2 className="text-lg font-bold text-center my-[10px]">
                <span className="text-blue-500">{rowItem.toUpperCase()}</span>
                &nbsp;에 대한 데이터 개수
              </h2>
              <hr className="w-full text-gray-200" />
            </div>
            <div className="flex justify-around items-center mb-4">
              <div className="flex gap-[10px] items-center">
                <span className="text-gray-500 text-sm">차트유형 : </span>
                <Select
                  value={rowChartType}
                  onChange={(value) => setRowChartType(value as ChartType)}
                  options={chartTypeOptions}
                  width="w-[200px]"
                />
              </div>

              <div className="flex gap-[10px] items-center">
                <span className="text-gray-500 text-sm">그룹항목 : </span>
                <Select
                  value={rowItem}
                  onChange={handleRowItemChange}
                  options={groupItemOptions || []}
                  width="w-[200px]"
                />
              </div>
            </div>

            {renderChart()}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <h3 className="text-lg font-semibold text-gray-700">
                집계항목 통계
              </h3>
              <h2 className="text-lg font-bold text-center my-[10px]">
                <span className="text-blue-500">INTENT</span>에 대한 데이터 개수
              </h2>
              <hr className="w-full text-gray-200" />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600">집계항목 통계 (개발 예정)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsItemPage;
