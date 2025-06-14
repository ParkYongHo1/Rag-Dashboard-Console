import DashboardDefaultInfo from "@/components/dashboard-info/DashBoardDefaultInfo";
import { DashBoardInfoProps } from "@/types/dashboard-info";
import { useParams } from "react-router-dom";

const DashboardInfo = ({ mode }: DashBoardInfoProps) => {
  const { dashboardId } = useParams<{ dashboardId: string }>();

  return (
    <>
      <div className="m-auto w-full h-[90vh] py-6">
        <div className="flex flex-col gap-[20px]">
          <div className="w-[98vw] border-gray-300 rounded-[5px] shadow-md m-auto">
            <div className="bg-white w-full border border-gray-300 rounded-[5px] py-6 px-[50px] min-h-[800px] max-h-[800px]">
              <DashboardDefaultInfo mode={mode} dashboardId={dashboardId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardInfo;
