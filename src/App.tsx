import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ReactNode, useEffect } from "react";
import Header from "@/components/Header/Header";
import DashboardListPage from "@/pages/dashboard-list/DashboardListPage";
import Footer from "@/components/Footer/Footer";
import LoginPage from "@/pages/login/LoginPage";
import { useCompanyStore } from "@/stores/companyStore";
import DashboardEditPage from "./pages/dashboard-edit/DashboardEditPage";
import DashboardAddPage from "./pages/dashboard-add/DashboardAddPage";

interface LayoutWrapperProps {
  children: ReactNode;
}

// 인증 상태 모니터링 컴포넌트
const AuthMonitor = () => {
  const navigate = useNavigate();
  const isAuthenticated = useCompanyStore((state) => state.isAuthenticated);
  const accessToken = useCompanyStore((state) => state.accessToken);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      console.log("🚪 인증 상태 변경 감지 - 로그인 페이지로 이동");
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, accessToken, navigate]);

  return null;
};

// 앱 컴포넌트
function App() {
  const isAuthenticated = useCompanyStore((state) => state.isAuthenticated);

  // 페이지 로드 시 세션 복원 확인
  useEffect(() => {
    const checkSession = () => {
      const store = useCompanyStore.getState();

      if (store.isAuthenticated && store.accessTokenExpiresAt) {
        const now = Date.now();
        const expiresAt = store.accessTokenExpiresAt;

        if (now >= expiresAt) {
          console.warn(
            "⚠️ 페이지 로드 시 토큰이 만료된 것을 확인 - 로그아웃 처리"
          );
          store.logout();
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.replace("/login");
        }
      }
    };

    checkSession();
  }, []);

  return (
    <Router>
      <AuthMonitor />
      <LayoutWrapper>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <DashboardListPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/add-dashboard/"
            element={
              isAuthenticated ? (
                <DashboardAddPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/edit-dashboard/:dashboardId"
            element={
              isAuthenticated ? (
                <DashboardEditPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <>
      <main className="bg-gray-100">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
    </>
  );
};

export default App;
