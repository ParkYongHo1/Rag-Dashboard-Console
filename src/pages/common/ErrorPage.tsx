import { useNavigate } from "react-router-dom";
import warn from "@/assets/common/warn.svg";
import home from "@/assets/common/home.svg";
interface ErrorPageProps {
  title?: string;
  message?: string;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
  onRetry?: () => void;
  error?: Error | null;
}

const AlertCircleIcon = ({ className }: { className?: string }) => (
  <img src={warn} className={className} />
);

const RefreshIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polyline points="23,4 23,10 17,10"></polyline>
    <polyline points="1,20 1,14 7,14"></polyline>
    <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10"></path>
    <path d="M3.51,15a9,9,0,0,0,14.85,3.36L23,14"></path>
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <img src={home} className={className} />
);

const ErrorPage = ({
  title = "문제가 발생했습니다",
  message = "요청을 처리하는 중에 오류가 발생했습니다.",
  showRetryButton = true,
  showHomeButton = true,
  onRetry,
}: ErrorPageProps) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <AlertCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-800 mb-2">{title}</h1>
            <p className="text-gray-600">{message}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showRetryButton && (
              <button
                onClick={handleRetry}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <RefreshIcon className="w-4 h-4" />
                다시 시도
              </button>
            )}
            {showHomeButton && (
              <button
                onClick={handleGoHome}
                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                <HomeIcon className="w-4 h-4" />
                홈으로 가기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
