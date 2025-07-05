import React from "react";
import { useDashboardStore } from "@/stores/dashboardStore";
import DashboardGroupTable, { GroupItem } from "./DashboardGroupTable";

const DashboardDetailInfo: React.FC = () => {
  const { currentDashboard, groupItems, setGroupItems, getDatabaseColumnList } =
    useDashboardStore();
  console.log(getDatabaseColumnList());
  const handleGroupDataChange = (newGroupData: GroupItem[]): void => {
    setGroupItems(newGroupData);
    console.log("그룹 데이터 변경:", newGroupData);
  };

  if (!currentDashboard) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">대시보드 상세 정보</h3>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium mb-4">그룹 설정</h4>
        <DashboardGroupTable
          groupData={groupItems}
          onGroupDataChange={handleGroupDataChange}
          getDatabaseColumnList={getDatabaseColumnList}
        />
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
        <p className="font-medium mb-2">현재 그룹 데이터:</p>
        <pre className="text-xs bg-white p-2 rounded border overflow-auto">
          {JSON.stringify(groupItems, null, 2)}
        </pre>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-600">
        <p className="font-medium mb-2">사용 방법:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>행의 순서 아이콘을 드래그해서 순서를 변경할 수 있습니다</li>
          <li>데이터 필드 항목에서 사용할 컬럼을 선택하세요</li>
          <li>화면에 표시할 이름을 입력하세요</li>
          <li>통계에 사용할 값을 입력하세요</li>
          <li>삭제 버튼을 클릭해서 항목을 제거할 수 있습니다</li>
          <li>+ 항목 추가 버튼으로 새로운 그룹 항목을 추가할 수 있습니다</li>
        </ul>
      </div>
    </>
  );
};

export default DashboardDetailInfo;
