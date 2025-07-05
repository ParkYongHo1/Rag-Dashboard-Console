import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "@/stores/companyStore";

// 세션 만료 처리를 위한 커스텀 훅
export const useSessionExpired = () => {
  const navigate = useNavigate();

  const handleSessionExpired = () => {
    const store = useCompanyStore.getState();

    // 로컬 상태 정리
    store.logout();

    // 알림 표시
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");

    // 로그인 페이지로 이동
    navigate("/login", { replace: true });

    // 추가적으로 강제 새로고침 (필요한 경우)
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return { handleSessionExpired };
};

export const setupGlobalSessionHandler = () => {
  const handleSessionExpiredEvent = () => {
    const store = useCompanyStore.getState();
    store.logout();
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    window.location.replace("/login");
  };

  window.addEventListener("session-expired", handleSessionExpiredEvent);

  return () => {
    window.removeEventListener("session-expired", handleSessionExpiredEvent);
  };
};

export const triggerSessionExpired = () => {
  const event = new CustomEvent("session-expired");
  window.dispatchEvent(event);
};
