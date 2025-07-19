import React from "react";
import { AggregatedData } from "@/stores/dashboardStore";

interface ConditionValueInputProps {
  item: AggregatedData;
  onItemChange: (
    id: number,
    field: keyof AggregatedData,
    value: string | number
  ) => void;
}

const ConditionValueInput: React.FC<ConditionValueInputProps> = ({
  item,
  onItemChange,
}) => {
  const convertValue = (value: string, dataType: string): string | number => {
    if (dataType === "int" || dataType === "number") {
      const numValue = Number(value);
      return isNaN(numValue) ? 0 : numValue;
    }
    return value;
  };

  const isNumericType = (dataType: string): boolean => {
    return dataType === "int" || dataType === "number";
  };

  const handleContainsValueChange = (
    id: number,
    startValue: string,
    endValue: string
  ) => {
    if (isNumericType(item.dataType)) {
      const startNum = convertValue(startValue, item.dataType);
      const endNum = convertValue(endValue, item.dataType);
      const combinedValue = `${startNum},${endNum}`;
      onItemChange(id, "conditionValue", combinedValue);
    } else {
      const combinedValue = `${startValue},${endValue}`;
      onItemChange(id, "conditionValue", combinedValue);
    }
  };

  const getContainsValues = (conditionValue: string | number) => {
    const stringValue = String(conditionValue);
    const values = stringValue.split(",");
    return {
      startValue: values[0] || "",
      endValue: values[1] || "",
    };
  };

  if (item.dashboardCondition === "범위지정") {
    return (
      <div className="flex space-x-1">
        <input
          type={isNumericType(item.dataType) ? "number" : "text"}
          className="w-1/2 border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
          placeholder="시작"
          value={getContainsValues(item.conditionValue).startValue}
          onChange={(e) => {
            const { endValue } = getContainsValues(item.conditionValue);
            handleContainsValueChange(
              item.aggregatedId,
              e.target.value,
              endValue
            );
          }}
        />
        <input
          type={isNumericType(item.dataType) ? "number" : "text"}
          className="w-1/2 border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1"
          placeholder="끝"
          value={getContainsValues(item.conditionValue).endValue}
          onChange={(e) => {
            const { startValue } = getContainsValues(item.conditionValue);
            handleContainsValueChange(
              item.aggregatedId,
              startValue,
              e.target.value
            );
          }}
        />
      </div>
    );
  }

  return (
    <input
      type={isNumericType(item.dataType) ? "number" : "text"}
      className={`w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 outline-none text-sm py-1 ${
        item.dashboardCondition === "없음"
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : ""
      }`}
      placeholder={item.dashboardCondition === "없음" ? "없음" : "조건 값"}
      value={item.conditionValue}
      disabled={item.dashboardCondition === "없음"}
      onChange={(e) => {
        const convertedValue = convertValue(e.target.value, item.dataType);
        onItemChange(item.aggregatedId, "conditionValue", convertedValue);
      }}
    />
  );
};

export default ConditionValueInput;
