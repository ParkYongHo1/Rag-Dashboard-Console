import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "@/stores/companyStore";

export const useSessionExpired = () => {
  const navigate = useNavigate();

  const handleSessionExpired = () => {
    const store = useCompanyStore.getState();

    store.logout();

    alert("세션이 만료되었습니다. 다시 로그인해주세요.");

    navigate("/login", { replace: true });

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
