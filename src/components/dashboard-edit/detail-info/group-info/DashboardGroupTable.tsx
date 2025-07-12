import React, { useRef, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { DatabaseColumn } from "@/stores/dashboardStore";
import GroupTableHeader from "./GroupTableHeader";
import GroupTableBody from "./GroupTableBody";
import GroupTableFooter from "./GroupTableFooter";

export interface GroupItem {
  groupId: number;
  databaseColumn: string;
  databaseColumnAlias: string;
  data: string;
}

interface DashboardGroupTableProps {
  groupData: GroupItem[];
  onGroupDataChange: (groupData: GroupItem[]) => void;
  getDatabaseColumnList: () => DatabaseColumn[];
}

const DashboardGroupTable: React.FC<DashboardGroupTableProps> = ({
  groupData,
  onGroupDataChange,
  getDatabaseColumnList,
}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [showError, setShowError] = useState(false);

  const databaseColumn = getDatabaseColumnList();
  console.log(databaseColumn.map((i) => i?.databaseColumn));

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(groupData);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    const reorderedItems = items.map((item, index) => ({
      ...item,
      groupId: index + 1,
    }));

    onGroupDataChange(reorderedItems);
  };

  const onAddItem = () => {
    const isValid = groupData.every(
      (item) => item.databaseColumn && item.databaseColumnAlias && item.data
    );

    if (!isValid) {
      setShowError(true);
      return;
    }

    setShowError(false);

    const newId =
      groupData.length > 0
        ? Math.max(...groupData.map((item) => item.groupId)) + 1
        : 1;
    const newItem: GroupItem = {
      groupId: newId,
      databaseColumn: "",
      databaseColumnAlias: "",
      data: "",
    };

    onGroupDataChange([...groupData, newItem]);
  };

  const handleDeleteItem = (id: number) => {
    const newItems = groupData.filter((item) => item.groupId !== id);
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      groupId: index + 1,
    }));
    onGroupDataChange(reorderedItems);
  };

  const handleItemChange = (
    id: number,
    field: keyof GroupItem,
    value: string | number
  ) => {
    const newItems = groupData.map((item) =>
      item.groupId === id ? { ...item, [field]: value } : item
    );
    onGroupDataChange(newItems);
  };

  return (
    <div className="mt-6 border-gray-300 rounded-[5px] border p-3">
      <p>
        그룹 항목&nbsp;&nbsp;
        <span className="text-red-500 text-xs">
          * 통계 데이터를 분류하고 분석할 기준이 되는 항목입니다.
        </span>
      </p>
      <div className="w-[100%] pt-3 min-h-[400px]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <table
            ref={tableRef}
            className="w-full border-collapse"
            style={{ tableLayout: "fixed" }}
          >
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[20%]" />
              <col className="w-[30%]" />
              <col className="w-[30%]" />
              <col className="w-[10%]" />
            </colgroup>
            <GroupTableHeader />
            <GroupTableBody
              groupData={groupData}
              databaseColumn={databaseColumn}
              onItemChange={handleItemChange}
              onDeleteItem={handleDeleteItem}
              tableRef={tableRef}
            />
          </table>
        </DragDropContext>
      </div>
      <GroupTableFooter showError={showError} onAddItem={onAddItem} />
    </div>
  );
};

export default DashboardGroupTable;
