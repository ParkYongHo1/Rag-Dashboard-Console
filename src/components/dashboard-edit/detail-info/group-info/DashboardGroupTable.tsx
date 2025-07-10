import React, { useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableStyle,
} from "@hello-pangea/dnd";
import indexing from "@/assets/dashboard-info/index.svg";
import trash from "@/assets/dashboard-info/trash.svg";
import { DatabaseColumn } from "@/stores/dashboardStore";

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
            <thead className="text-sm">
              <tr className="bg-gray-50 border border-gray-200 text-gray-600 text-sm text-center">
                <th className="p-2 border border-gray-300">순서</th>
                <th className="p-2 border border-gray-300">데이터 필드 항목</th>
                <th className="p-2 border border-gray-300">
                  화면에 표시할 이름
                </th>
                <th className="p-2 border border-gray-300">통계에 사용할 값</th>
                <th className="p-2 border border-gray-300">삭제</th>
              </tr>
            </thead>
            <Droppable droppableId="groupItems">
              {(provided) => (
                <tbody
                  className={groupData.length === 0 ? `h-[300px]` : ""}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {groupData.length === 0 ? (
                    <tr className="min-h-[200px]">
                      <td
                        colSpan={5}
                        className="text-center min-h-[200px] py-6 text-gray-500"
                      >
                        항목이 없습니다.{" "}
                        <span className="font-medium text-blue-600">
                          + 항목 추가
                        </span>{" "}
                        버튼을 눌러 추가해주세요.
                      </td>
                    </tr>
                  ) : (
                    groupData.map((item, index) => (
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
                                  handleItemChange(
                                    item.groupId,
                                    "databaseColumn",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">컬럼 선택</option>
                                {databaseColumn.map((col) => (
                                  <option
                                    key={col.databaseColumn}
                                    value={col.databaseColumn}
                                  >
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
                                  handleItemChange(
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
                                  handleItemChange(
                                    item.groupId,
                                    "data",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td
                              className="py-2 px-3 border border-gray-300"
                              style={{ width: "10%" }}
                            >
                              <button
                                className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                                onClick={() => handleDeleteItem(item.groupId)}
                              >
                                <img src={trash} alt="삭제" />
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
      <div className="mt-2 flex justify-between items-center w-full">
        {showError ? (
          <p className="text-red-500 text-sm">
            모든 항목 입력 후 항목 추가 버튼을 눌러주세요.
          </p>
        ) : (
          <div />
        )}

        <button
          onClick={onAddItem}
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600"
        >
          + 항목 추가
        </button>
      </div>
    </div>
  );
};

export default DashboardGroupTable;
