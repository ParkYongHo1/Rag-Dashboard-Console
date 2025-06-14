import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import DashboardList from "@/pages/dashboard-list/DashboardList";
import DashboardInfo from "./pages/dashboard-info/DashboardInfo";

interface LayoutWrapperProps {
  children: ReactNode;
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<DashboardList />} />
          <Route
            path="/add-dashboard/"
            element={<DashboardInfo mode="add" />}
          />
          <Route
            path="/edit-dashboard/:dashboardId"
            element={<DashboardInfo mode="edit" />}
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
      </main>
    </>
  );
};
export default App;
