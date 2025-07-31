import { ChangeEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  width?: string;
  className?: string;
  disabled?: boolean;
}

const Select = ({
  value,
  onChange,
  options,
  width = "w-[200px]",
  className = "",
  disabled = false,
}: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className={`${width} text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default Select;
