import React, { RefObject } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { AggregatedData, DatabaseColumn } from "@/stores/dashboardStore";
import AggregatedTableRow from "./AggregatedTableRow";

interface AggregatedTableBodyProps {
  aggregatedData: AggregatedData[];
  databaseColumn: DatabaseColumn[];
  onItemChange: (
    id: number,
    field: keyof AggregatedData,
    value: string | number
  ) => void;
  onDeleteItem: (id: number) => void;
  tableRef: RefObject<HTMLTableElement | null>;
}

const AggregatedTableBody: React.FC<AggregatedTableBodyProps> = ({
  aggregatedData,
  databaseColumn,
  onItemChange,
  onDeleteItem,
  tableRef,
}) => {
  return (
    <Droppable droppableId="aggregatedItems">
      {(provided) => (
        <tbody
          className={aggregatedData.length === 0 ? `h-[300px]` : ""}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {aggregatedData.length === 0 ? (
            <tr className="min-h-[200px]">
              <td
                colSpan={7}
                className="text-center min-h-[200px] py-6 text-gray-500"
              >
                항목이 없습니다.{" "}
                <span className="font-medium text-blue-600">+ 항목 추가</span>{" "}
                버튼을 눌러 추가해주세요.
              </td>
            </tr>
          ) : (
            aggregatedData.map((item, index) => (
              <AggregatedTableRow
                key={item.aggregatedId}
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

export default AggregatedTableBody;
