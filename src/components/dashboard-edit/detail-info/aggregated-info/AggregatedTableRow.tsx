import React, { RefObject } from "react";
import { Draggable, DraggableStyle } from "@hello-pangea/dnd";
import { AggregatedData, DatabaseColumn } from "@/stores/dashboardStore";
import indexing from "@/assets/dashboard-info/index.svg";
import trash from "@/assets/dashboard-info/trash.svg";
import ConditionValueInput from "./ConditionValueInput";
import { CONDITION } from "@/constants/conditionPotion";
import { METHOD } from "@/constants/constants";

interface AggregatedTableRowProps {
  item: AggregatedData;
  index: number;
  databaseColumn: DatabaseColumn[];
  onItemChange: (
    id: number,
    field: keyof AggregatedData,
    value: string | number
  ) => void;
  onDeleteItem: (id: number) => void;
  tableRef: RefObject<HTMLTableElement | null>;
}

const AggregatedTableRow: React.FC<AggregatedTableRowProps> = ({
  item,
  index,
  databaseColumn,
  onItemChange,
  onDeleteItem,
  tableRef,
}) => {
  const getItemStyle = (
    isDragging: boolean,
    draggableStyle?: DraggableStyle
  ) => {
    if (!isDragging || !tableRef.current) {
      return draggableStyle;
    }

    return {
      ...draggableStyle,
      display: "table",
      tableLayout: "fixed" as const,
      width: "100%",
      backgroundColor: "#f3f4f6",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
    };
  };

  return (
    <Draggable
      key={item.aggregatedId}
      draggableId={item.aggregatedId.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border border-gray-300 text-center"
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <td className="py-2 px-2 border border-gray-300 text-center">
            <img src={indexing} alt="순서 아이콘" className="h-[20px] w-full" />
          </td>
          <td className="py-2 px-2 border border-gray-300">
            <select
              className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
              value={item.aggregatedDatabaseColumn}
              onChange={(e) => {
                onItemChange(
                  item.aggregatedId,
                  "aggregatedDatabaseColumn",
                  e.target.value
                );
              }}
            >
              <option value="">컬럼 선택</option>
              {databaseColumn.map((col) => (
                <option key={col.databaseColumn} value={col.databaseColumn}>
                  {col.databaseColumn}
                </option>
              ))}
            </select>
          </td>
          <td className="py-2 px-2 border border-gray-300">
            <input
              type="text"
              className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
              placeholder="표시 이름"
              value={item.databaseColumnAlias}
              onChange={(e) =>
                onItemChange(
                  item.aggregatedId,
                  "databaseColumnAlias",
                  e.target.value
                )
              }
            />
          </td>
          <td className="py-2 px-2 border border-gray-300">
            <select
              className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
              value={item.dashboardCondition}
              onChange={(e) =>
                onItemChange(
                  item.aggregatedId,
                  "dashboardCondition",
                  e.target.value
                )
              }
            >
              <option value="">조건 선택</option>
              {CONDITION(item.dataType).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </td>
          <td className="py-2 px-2 border border-gray-300">
            <ConditionValueInput item={item} onItemChange={onItemChange} />
          </td>
          <td className="py-2 px-2 border border-gray-300">
            <select
              className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
              value={item.statMethod}
              onChange={(e) =>
                onItemChange(item.aggregatedId, "statMethod", e.target.value)
              }
            >
              <option value="">통계 방법 선택</option>
              {METHOD.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </td>

          <td className="py-2 px-2 border border-gray-300">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
              onClick={() => onDeleteItem(item.aggregatedId)}
            >
              <img src={trash} alt="삭제" />
            </button>
          </td>
        </tr>
      )}
    </Draggable>
  );
};

export default AggregatedTableRow;
