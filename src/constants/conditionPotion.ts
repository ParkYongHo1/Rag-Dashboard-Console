export interface ConditionOption {
  value: string;
  label: string;
}

export const CONDITION = (dataType: string): ConditionOption[] => {
  const baseOptions: ConditionOption[] = [
    { value: "없음", label: "없음" },
    { value: "같다", label: "같다 (==)" },
    { value: "다르다", label: "다르다 (!==)" },
  ];

  const stringOptions: ConditionOption[] = [
    { value: "포함된다", label: "포함된다 (in)" },
    { value: "포함되지 않는다", label: "포함되지 않는다 (not in)" },
  ];

  const numberOptions: ConditionOption[] = [
    { value: "크다", label: "크다 (>)" },
    { value: "크거나 같다", label: "크거나 같다 (>=)" },
    { value: "작다", label: "작다 (<)" },
    { value: "작거나 같다", label: "작거나 같다 (<=)" },
    { value: "범위지정", label: "범위 지정 (between)" },
  ];

  if (dataType?.toLowerCase() === "string") {
    return [...baseOptions, ...stringOptions];
  } else if (dataType?.toLowerCase() === "int") {
    return [...baseOptions, ...numberOptions, ...stringOptions];
  } else {
    return baseOptions;
  }
};
