import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ReactNode, useEffect } from "react";
import Header from "@/components/common/Header/Header";
import DashboardListPage from "@/pages/dashboard/dashboard-list/DashboardListPage";
import Footer from "@/components/common/Footer/Footer";
import LoginPage from "@/pages/login/LoginPage";
import { useCompanyStore } from "@/stores/companyStore";
import DashboardEditPage from "./pages/dashboard/dashboard-edit/DashboardEditPage";
import DashboardAddPage from "./pages/dashboard/dashboard-add/DashboardAddPage";
import ErrorPage from "@/pages/common/ErrorPage";
import StatsListPage from "@/pages/stats/stats-list/StatsListPage";
import StatsPage from "@/pages/stats/stats/StatsPage";

interface LayoutWrapperProps {
  children: ReactNode;
}

const AuthMonitor = () => {
  const navigate = useNavigate();
  const isAuthenticated = useCompanyStore((state) => state.isAuthenticated);
  const accessToken = useCompanyStore((state) => state.accessToken);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, accessToken, navigate]);

  return null;
};

const NotFoundPage = () => {
  return (
    <ErrorPage
      title="페이지를 찾을 수 없습니다"
      message="요청하신 페이지가 존재하지 않습니다."
      showRetryButton={false}
      showHomeButton={true}
    />
  );
};

function App() {
  const isAuthenticated = useCompanyStore((state) => state.isAuthenticated);

  useEffect(() => {
    const checkSession = () => {
      const store = useCompanyStore.getState();

      if (store.isAuthenticated && store.accessTokenExpiresAt) {
        const now = Date.now();
        const expiresAt = store.accessTokenExpiresAt;

        if (now >= expiresAt) {
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
            path="/stats-list"
            element={
              isAuthenticated ? (
                <StatsListPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/stats/:dashboardId"
            element={
              isAuthenticated ? <StatsPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route
            path="*"
            element={
              <Navigate to={isAuthenticated ? "/404" : "/login"} replace />
            }
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <main className="bg-gray-100">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default App;
