import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import back from "@/assets/dashboard-info/back.svg";
import save from "@/assets/dashboard-info/save.svg";
import trash from "@/assets/dashboard-info/trash.svg";
import { LinkButton } from "@/shared/ui/LinkButton";
import DashboardDetailInfo from "@/components/dashboard-edit/detail-info/DashboardDetailInfo";
import DashboardDefaultInfo from "@/components/dashboard-edit/default-info/DashboardDefaultInfo";
import { useDashboardEdit } from "@/hooks/useDashboardEdit";

const DashboardEditPage = () => {
  const {
    isLoading,
    currentDashboard,
    isPending,
    isAllFieldsFilled,
    handleSave,
    handleDelete,
  } = useDashboardEdit();

  if (isLoading) {
    return (
      <LoadingSpinner
        overlay={true}
        size="lg"
        color="blue"
        text="대시보드 정보를 불러오는 중입니다..."
      />
    );
  }

  return (
    <>
      <div className="m-auto w-full py-6">
        <div className="flex flex-col gap-[20px]">
          <div className="w-[98vw] border-gray-300 rounded-[5px] shadow-md m-auto my-6">
            <div className="bg-white w-full border border-gray-300 rounded-[5px] py-6 px-[50px] min-h-[700px]">
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl">DASHBOARD 수정</div>
                <div className="flex items-center gap-[10px]">
                  <LinkButton path="/" type="back">
                    <img
                      src={back}
                      alt="뒤로가기 아이콘"
                      className="w-[24px] h-[24px]"
                    />
                    <p className="text-black">뒤로</p>
                  </LinkButton>
                  <button
                    onClick={handleSave}
                    disabled={isPending || !isAllFieldsFilled()}
                    className="text-white bg-green-500 shadow-md px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer text-sm hover:bg-green-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <div className="flex gap-[5px] justify-center items-center w-[60px]">
                      <img
                        src={save}
                        alt="저장 아이콘"
                        className="w-[24px] h-[24px]"
                      />
                      <p>저장</p>
                    </div>
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-white bg-red-500 shadow-md px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer text-sm hover:bg-red-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <div className="flex gap-[5px] justify-center items-center w-[60px]">
                      <img
                        src={trash}
                        alt="삭제 아이콘"
                        className="w-[24px] h-[24px]"
                      />
                      <p>삭제</p>
                    </div>
                  </button>
                </div>
              </div>
              <DashboardDefaultInfo />
              {currentDashboard && <DashboardDetailInfo />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardEditPage;
