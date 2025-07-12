import React, { useEffect } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";
import { GroupItem, AggregatedData } from "@/stores/dashboardStore";
import DashboardAggregatedTable from "./aggregated-info/DashboardAggregatedTable";
import DashboardGroupTable from "./group-info/DashboardGroupTable";
import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

const DashboardDetailInfo: React.FC = () => {
  const {
    currentDashboard,
    groupItems,
    aggregatedItems,
    setGroupItems,
    setAggregatedItems,
    getDatabaseColumnList,
  } = useDashboardStore();

  useEffect(() => {
    if (currentDashboard?.dashboardDetailInfo) {
      const { groupData, aggregatedData } =
        currentDashboard.dashboardDetailInfo;

      if (groupData && Array.isArray(groupData)) {
        setGroupItems(groupData);
      }

      if (aggregatedData && Array.isArray(aggregatedData)) {
        setAggregatedItems(aggregatedData);
      }
    }
  }, [currentDashboard, setGroupItems, setAggregatedItems]);

  const handleGroupDataChange = (newGroupData: GroupItem[]): void => {
    setGroupItems(newGroupData);
  };

  const handleAggregatedDataChange = (
    newAggregatedData: AggregatedData[]
  ): void => {
    setAggregatedItems(newAggregatedData);
  };

  if (!currentDashboard) {
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="대시보드 정보를 불러오는 중입니다..."
      />
    );
  }

  return (
    <>
      <div className="my-6">
        <h4 className="text-lg font-medium mb-4">대시보드 상세 정보</h4>
        <DashboardGroupTable
          groupData={groupItems}
          onGroupDataChange={handleGroupDataChange}
          getDatabaseColumnList={getDatabaseColumnList}
        />
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
          <p className="font-medium mb-2">현재 그룹 데이터:</p>
          <pre className="text-xs bg-white p-2 rounded border overflow-auto">
            {JSON.stringify(groupItems, null, 2)}
          </pre>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-600">
          <p className="font-medium mb-2">사용 방법:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-blue-800 mb-1">그룹 항목:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>행의 순서 아이콘을 드래그해서 순서를 변경할 수 있습니다</li>
                <li>데이터 필드 항목에서 사용할 컬럼을 선택하세요</li>
                <li>화면에 표시할 이름을 입력하세요</li>
                <li>통계에 사용할 값을 선택하세요</li>
                <li>삭제 버튼을 클릭해서 항목을 제거할 수 있습니다</li>
              </ul>
            </div>
          </div>
        </div>
        <DashboardAggregatedTable
          aggregatedData={aggregatedItems}
          onAggregatedDataChange={handleAggregatedDataChange}
          getDatabaseColumnList={getDatabaseColumnList}
        />
        <div className="mt-4 p-3 bg-green-50 rounded text-sm text-green-600">
          <p className="font-medium mb-2">현재 집계 데이터:</p>
          <pre className="text-xs bg-white p-2 rounded border overflow-auto">
            {JSON.stringify(aggregatedItems, null, 2)}
          </pre>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-600">
          <p className="font-medium mb-2">사용 방법:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>데이터 필드에서 집계할 컬럼을 선택하세요</li>
                <li>표시 이름을 입력하세요</li>
                <li>필터링 조건을 설정하세요</li>
                <li>조건 값을 입력하세요</li>
                <li>통계 방법(COUNT, SUM, AVG 등)을 선택하세요</li>
                <li>데이터 타입은 컬럼 선택 시 자동으로 설정됩니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDetailInfo;
