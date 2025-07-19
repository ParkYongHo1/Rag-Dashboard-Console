import React, { RefObject } from "react";
import { Draggable, DraggableStyle } from "@hello-pangea/dnd";
import {
  GroupItem,
  DatabaseColumn,
} from "@/types/dashboard-info/dashboard-groupData/index";
import indexing from "@/assets/dashboard-info/index.svg";
import trash from "@/assets/dashboard-info/trash.svg";

interface GroupTableRowProps {
  item: GroupItem;
  index: number;
  databaseColumn: DatabaseColumn[];
  onItemChange: (
    id: number,
    field: keyof GroupItem,
    value: string | number
  ) => void;
  onDeleteItem: (id: number) => void;
  tableRef: RefObject<HTMLTableElement | null>;
}

const GroupTableRow: React.FC<GroupTableRowProps> = ({
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
      key={item.groupId}
      draggableId={item.groupId.toString()}
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
          <td className="py-2 px-3 border border-gray-300 text-center w-[10%]">
            <img
              src={indexing}
              alt="순서 아이콘"
              className="h-[20px] w-[100%]"
            />
          </td>
          <td
            className="py-2 px-3 border border-gray-300"
            style={{ width: "20%" }}
          >
            <select
              className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
              value={item.databaseColumn}
              onChange={(e) =>
                onItemChange(item.groupId, "databaseColumn", e.target.value)
              }
            >
              <option value="">컬럼 선택</option>
              {databaseColumn.map((col) => (
                <option key={col.databaseColumn} value={col.databaseColumn}>
                  {col.databaseColumn}
                </option>
              ))}
            </select>
          </td>
          <td
            className="py-2 px-3 border border-gray-300"
            style={{ width: "30%" }}
          >
            <input
              type="text"
              className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
              placeholder="화면에 표시할 이름 입력"
              value={item.databaseColumnAlias}
              onChange={(e) =>
                onItemChange(
                  item.groupId,
                  "databaseColumnAlias",
                  e.target.value
                )
              }
            />
          </td>
          <td
            className="py-2 px-3 border border-gray-300"
            style={{ width: "30%" }}
          >
            <input
              type="text"
              className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
              placeholder="통계에 사용할 값 입력"
              value={item.data}
              onChange={(e) =>
                onItemChange(item.groupId, "data", e.target.value)
              }
            />
          </td>
          <td
            className="py-2 px-3 border border-gray-300"
            style={{ width: "10%" }}
          >
            <button
              className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
              onClick={() => onDeleteItem(item.groupId)}
            >
              <img src={trash} alt="삭제" />
            </button>
          </td>
        </tr>
      )}
    </Draggable>
  );
};

export default GroupTableRow;
