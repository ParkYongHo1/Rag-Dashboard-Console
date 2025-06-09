import { LinkButton } from "@/shared/ui/LinkButton";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-full shadow-md flex flex-col h-[10vh] bg-white">
      <div className="flex items-center justify-between px-6 py-5 h-[10vh] border-b border-gray-200">
        <div className="flex items-center gap-6">
          <div className="font-bold text-xl">DASHBOARD</div>
          <div className="flex items-center space-x-5 ">
            <LinkButton
              name="HOME"
              path="/"
              type="default"
              isActive={currentPath === "/"}
            />
            <LinkButton
              name="STATS"
              path="/stats"
              type="default"
              isActive={currentPath.startsWith("/stats")}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <LinkButton
            name="SETTING"
            path="/setting"
            type="default"
            isActive={currentPath === "/setting"}
          />

          <div className="text-sm font-bold">카디프생명</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
