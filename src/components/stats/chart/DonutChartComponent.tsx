import { COLORS } from "@/constants/constants";
import { renderActiveShape } from "@/utils/renderActiveShape";
import { JSX } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

interface ChartDataItem {
  name: string;
  value: number;
}

const DonutChartComponent = ({
  data,
}: {
  data?: ChartDataItem[];
}): JSX.Element => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
        <p className="text-gray-500">표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeShape={
            renderActiveShape as unknown as (props: unknown) => JSX.Element
          }
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={140}
          paddingAngle={5}
          dataKey="value"
          animationBegin={0}
          animationDuration={1200}
          animationEasing="ease-out"
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={10}
          layout="horizontal"
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "14px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChartComponent;
