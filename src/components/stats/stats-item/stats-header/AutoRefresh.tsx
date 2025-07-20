interface AutoRefreshProps {
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
  remainingTime: number;
  isRefreshing: boolean;
}

export const AutoRefresh = ({
  autoRefresh,
  setAutoRefresh,
  remainingTime,
  isRefreshing,
}: AutoRefreshProps) => {
  return (
    <div className="flex gap-[10px] relative group">
      <p className="text-sm text-gray-400 w-[90px]">
        {isRefreshing ? "데이터 로딩중" : "자동 새로고침"}
      </p>
      <span
        className={`w-[20px]  text-sm ${
          autoRefresh ? "text-blue-500" : "text-gray-400"
        }`}
      >
        {autoRefresh ? (
          isRefreshing ? (
            <svg
              className="w-4 h-4 animate-spin text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-10 10h4z"
              ></path>
            </svg>
          ) : (
            `${remainingTime}s`
          )
        ) : (
          "OFF"
        )}
      </span>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={autoRefresh}
          onChange={() => setAutoRefresh(!autoRefresh)}
        />
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
            autoRefresh ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
              autoRefresh ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
      </label>
      <div className="absolute top-full mt-2 hidden group-hover:block w-56 text-xs bg-gray-700 text-white rounded-md p-2 shadow-md">
        자동 새로고침 활성화 시 1분 간격으로 데이터가 업데이트 됩니다.
      </div>
    </div>
  );
};
