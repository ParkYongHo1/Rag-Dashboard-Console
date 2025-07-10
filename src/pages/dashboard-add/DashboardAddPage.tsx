import DashboardDefaultInfo from "@/components/dashboard-add/DashboardDefaultInfo";

const DashboardAddPage = () => {
  return (
    <div className="m-auto w-full py-6">
      <div className="flex flex-col gap-[20px]">
        <div className="w-[98vw] border-gray-300 rounded-[5px] shadow-md m-auto my-6">
          <div className="bg-white w-full border border-gray-300 rounded-[5px] py-6 px-[50px] min-h-[700px]">
            <div>test</div>
            <DashboardDefaultInfo />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardAddPage;
