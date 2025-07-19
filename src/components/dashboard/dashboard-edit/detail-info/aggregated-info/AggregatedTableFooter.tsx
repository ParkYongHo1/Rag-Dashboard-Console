import React from "react";

interface AggregatedTableFooterProps {
  showError: boolean;
  onAddItem: () => void;
}

const AggregatedTableFooter: React.FC<AggregatedTableFooterProps> = ({
  showError,
  onAddItem,
}) => {
  return (
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
  );
};

export default AggregatedTableFooter;
