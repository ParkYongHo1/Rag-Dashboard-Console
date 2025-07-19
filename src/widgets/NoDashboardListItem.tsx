import noData from "@/assets/dashboard-list/no_data.svg";
const NoDashboardListItem = () => {
  return (
    <>
      <>
        <div className="flex flex-col items-center justify-center w-full mt-[10%]">
          <div className="relative h-[400px] w-full flex justify-center">
            <div className="w-[500px] h-[15px] bg-gray-300 border-gray-200 border-[2px] rounded-[20px] mb-[20px] shadow-inner "></div>
            <div
              className="z-10 bg-white h-[400px] w-[400px] border-gray-200 border-[2px] absolute top-[0px] left-[50%] transform -translate-x-1/2 shadow-inner"
              style={{
                borderTopStyle: "solid",
                borderBottomStyle: "dashed",
              }}
            >
              <div className="w-full h-full mt-[20%] text-center">
                <img
                  src={noData}
                  alt="실패 아이콘"
                  className="m-auto"
                  width={90}
                  height={90}
                />
                <p className="font-md text-2xl mt-[10%] text-gray-500">
                  대시보드 없음
                </p>
                <hr className="w-[80%] m-auto my-[5%] border-gray-300 border border-[2px]" />
                <p className="text-2xl font-bold text-blue-500">
                  대시보드를 생성해주세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
export default NoDashboardListItem;
