// DashboardDetailInfo.tsx
import React, { useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import DashboardRowTable from "./DashboardRowTable";
export interface DashboardItem {
  id: string;
  dataField: string;
  displayName: string;
  statisticValue: "숫자" | "텍스트" | "카테고리";
}
// 샘플 데이터
const initialItems: DashboardItem[] = [
  {
    id: "1",
    dataField: "name",
    displayName: "고객명",
    statisticValue: "텍스트",
  },
  {
    id: "2",
    dataField: "age",
    displayName: "나이",
    statisticValue: "숫자",
  },
  {
    id: "3",
    dataField: "gender",
    displayName: "성별",
    statisticValue: "카테고리",
  },
  {
    id: "4",
    dataField: "purchase_amount",
    displayName: "구매금액",
    statisticValue: "숫자",
  },
];

const DashboardDetailInfo: React.FC = () => {
  const [items, setItems] = useState<DashboardItem[]>(initialItems);

  const handleReorder = (result: DropResult): void => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  const handleDelete = (id: string): void => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddItem = (): void => {
    const newItem: DashboardItem = {
      id: Date.now().toString(),
      dataField: `field_${Date.now()}`,
      displayName: "새 필드",
      statisticValue: "텍스트",
    };
    setItems([...items, newItem]);
  };

  return (
    <>
      <div className="mt-6 border-gray-300 rounded-[5px] border p-3">
        <div className="flex justify-between items-center mb-4">
          <p>
            그룹 항목&nbsp;&nbsp;
            <span className="text-red-500 text-xs">
              * 통계 데이터를 분류하고 분석할 기준이 되는 항목입니다.
            </span>
          </p>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors duration-200"
          >
            항목 추가
          </button>
        </div>
        <div className="w-[100%] pt-3 min-h-[400px]">
          <DashboardRowTable
            items={items}
            onReorder={handleReorder}
            onDelete={handleDelete}
          />
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
          <p className="font-medium mb-2">사용 방법:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>행의 순서 번호를 드래그해서 순서를 변경할 수 있습니다</li>
            <li>삭제 버튼을 클릭해서 항목을 제거할 수 있습니다</li>
            <li>항목 추가 버튼으로 새로운 필드를 추가할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardDetailInfo;
