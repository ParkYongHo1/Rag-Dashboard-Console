import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import DashboardListPage from "@/pages/dashboard-list/DashboardListPage";
import DashboardInfoPage from "./pages/dashboard-info/DashboardInfoPage";
import Footer from "@/components/Footer/Footer";
import LoginPage from "@/pages/login/LoginPage";

interface LayoutWrapperProps {
  children: ReactNode;
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<DashboardListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/add-dashboard/"
            element={<DashboardInfoPage mode="add" />}
          />
          <Route
            path="/edit-dashboard/:dashboardId"
            element={<DashboardInfoPage mode="edit" />}
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <>
      <main className="bg-gray-100 ">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </main>
    </>
  );
};
export default App;
