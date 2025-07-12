import React, { RefObject } from "react";
import { Droppable } from "@hello-pangea/dnd";
import {
  GroupItem,
  DatabaseColumn,
} from "@/types/dashboard-info/dashboard-groupData/index";
import GroupTableRow from "./GroupTableRow";

interface GroupTableBodyProps {
  groupData: GroupItem[];
  databaseColumn: DatabaseColumn[];
  onItemChange: (
    id: number,
    field: keyof GroupItem,
    value: string | number
  ) => void;
  onDeleteItem: (id: number) => void;
  tableRef: RefObject<HTMLTableElement | null>;
}

const GroupTableBody: React.FC<GroupTableBodyProps> = ({
  groupData,
  databaseColumn,
  onItemChange,
  onDeleteItem,
  tableRef,
}) => {
  return (
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
                <span className="font-medium text-blue-600">+ 항목 추가</span>{" "}
                버튼을 눌러 추가해주세요.
              </td>
            </tr>
          ) : (
            groupData.map((item, index) => (
              <GroupTableRow
                key={item.groupId}
                item={item}
                index={index}
                databaseColumn={databaseColumn}
                onItemChange={onItemChange}
                onDeleteItem={onDeleteItem}
                tableRef={tableRef}
              />
            ))
          )}
          {provided.placeholder}
        </tbody>
      )}
    </Droppable>
  );
};

export default GroupTableBody;
