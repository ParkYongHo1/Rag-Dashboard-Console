import React, { useRef, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { AggregatedData, DatabaseColumn } from "@/stores/dashboardStore";
import AggregatedTableHeader from "./AggregatedTableHeader";
import AggregatedTableBody from "./AggregatedTableBody";
import AggregatedTableFooter from "./AggregatedTableFooter";

interface DashboardAggregatedTableProps {
  aggregatedData: AggregatedData[];
  onAggregatedDataChange: (aggregatedData: AggregatedData[]) => void;
  getDatabaseColumnList: () => DatabaseColumn[];
}

const DashboardAggregatedTable: React.FC<DashboardAggregatedTableProps> = ({
  aggregatedData,
  onAggregatedDataChange,
  getDatabaseColumnList,
}) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [showError, setShowError] = useState(false);

  const databaseColumn = getDatabaseColumnList();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(aggregatedData);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    const reorderedItems = items.map((item, index) => ({
      ...item,
      aggregatedId: index + 1,
    }));

    onAggregatedDataChange(reorderedItems);
  };

  const onAddItem = () => {
    const isValid = aggregatedData.every(
      (item) =>
        item.aggregatedDatabaseColumn &&
        item.databaseColumnAlias &&
        item.dashboardCondition &&
        (item.dashboardCondition === "없음" || item.conditionValue) &&
        item.statMethod
    );

    if (!isValid) {
      setShowError(true);
      return;
    }

    setShowError(false);

    const newId =
      aggregatedData.length > 0
        ? Math.max(...aggregatedData.map((item) => item.aggregatedId)) + 1
        : 1;
    const newItem: AggregatedData = {
      aggregatedId: newId,
      aggregatedDatabaseColumn: "",
      dataType: "",
      databaseColumnAlias: "",
      dashboardCondition: "",
      conditionValue: "",
      statMethod: "",
    };

    onAggregatedDataChange([...aggregatedData, newItem]);
  };

  const handleDeleteItem = (id: number) => {
    const newItems = aggregatedData.filter((item) => item.aggregatedId !== id);
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      aggregatedId: index + 1,
    }));
    onAggregatedDataChange(reorderedItems);
  };

  const handleItemChange = (
    id: number,
    field: keyof AggregatedData,
    value: string | number
  ) => {
    const newItems = aggregatedData.map((item) => {
      if (item.aggregatedId === id) {
        const updatedItem = { ...item, [field]: value };

        if (field === "aggregatedDatabaseColumn") {
          const selectedColumn = databaseColumn.find(
            (col) => col.databaseColumn === value
          );
          updatedItem.dataType = selectedColumn ? selectedColumn.dataType : "";
        }

        if (field === "dashboardCondition" && value === "없음") {
          updatedItem.conditionValue = "없음";
        }

        if (
          field === "dashboardCondition" &&
          item.dashboardCondition === "contains" &&
          value !== "contains"
        ) {
          updatedItem.conditionValue = "";
        }

        return updatedItem;
      }
      return item;
    });
    console.log(newItems);
    onAggregatedDataChange(newItems);
  };

  return (
    <div className="mt-6 border-gray-300 rounded-[5px] border p-3">
      <p>
        집계 항목&nbsp;&nbsp;
        <span className="text-red-500 text-xs">
          * 통계 데이터를 계산하고 표시할 항목들입니다.
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
              <col className="w-[8%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[10%]" />
              <col className="w-[20%]" />
              <col className="w-[12%]" />
              <col className="w-[8%]" />
            </colgroup>
            <AggregatedTableHeader />
            <AggregatedTableBody
              aggregatedData={aggregatedData}
              databaseColumn={databaseColumn}
              onItemChange={handleItemChange}
              onDeleteItem={handleDeleteItem}
              tableRef={tableRef}
            />
          </table>
        </DragDropContext>
      </div>
      <AggregatedTableFooter showError={showError} onAddItem={onAddItem} />
    </div>
  );
};

export default DashboardAggregatedTable;
