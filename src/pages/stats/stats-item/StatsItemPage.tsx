import StatsHeader from "@/components/stats/stats-item/stats-header/StatsHeader";

const StatsItemPage = () => {
  return (
    <div className="min-h-[85vh] bg-white mb-[20px]">
      <div className="px-6 mt-[20px]">
        <StatsHeader />
      </div>
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <h3 className="text-lg font-semibold text-gray-700">
                그룹항목 통계
              </h3>
              <h2 className="text-lg font-bold text-center my-[10px]">
                <span className="text-blue-500">INTENT</span>에 대한 데이터 개수
              </h2>
              <hr className="w-full text-gray-200" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <h3 className="text-lg font-semibold text-gray-700">
                집계항목 통계
              </h3>
              <h2 className="text-lg font-bold text-center my-[10px]">
                <span className="text-blue-500">INTENT</span>에 대한 데이터 개수
              </h2>
              <hr className="w-full text-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsItemPage;
