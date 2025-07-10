import React from "react";

const AggregatedTableHeader: React.FC = () => {
  return (
    <thead className="text-sm">
      <tr className="bg-gray-50 border border-gray-200 text-gray-600 text-sm text-center">
        <th className="p-2 border border-gray-300">순서</th>
        <th className="p-2 border border-gray-300">데이터 필드 항목</th>
        <th className="p-2 border border-gray-300">화면에 표시할 이름</th>
        <th className="p-2 border border-gray-300">조건</th>
        <th className="p-2 border border-gray-300">조건 값</th>
        <th className="p-2 border border-gray-300">통계 방법</th>
        <th className="p-2 border border-gray-300">삭제</th>
      </tr>
    </thead>
  );
};

export default AggregatedTableHeader;
