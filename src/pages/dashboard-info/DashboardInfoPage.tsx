import DashboardDefaultInfo from "../../components/dashboard-info/DashboardDefaultInfo";
import DashboardDetailInfo from "@/components/dashboard-info/DashboardDetailInfo";
import { DashBoardInfoProps } from "@/types/dashboard-info";
import { useParams } from "react-router-dom";

const DashboardInfoPage = ({ mode }: DashBoardInfoProps) => {
  const { dashboardId } = useParams<{ dashboardId: string }>();

  return (
    <>
      <div className="m-auto w-full  py-6">
        <div className="flex flex-col gap-[20px]">
          <div className="w-[98vw] border-gray-300 rounded-[5px] shadow-md m-auto my-6">
            <div className="bg-white w-full border border-gray-300 rounded-[5px] py-6 px-[50px] min-h-[700px]">
              <DashboardDefaultInfo mode={mode} dashboardId={dashboardId} />
              {mode === "edit" && <DashboardDetailInfo />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardInfoPage;
