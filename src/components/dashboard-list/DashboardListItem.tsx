import edit from "@/assets/dashboard-list/edit.svg";
import { DashboardItem } from "@/types/dashboard-list";

interface DashboardListItemProps {
  item: DashboardItem;
}

const DashboardListItem: React.FC<DashboardListItemProps> = ({ item }) => {
  return (
    <>
      <tr>
        <td className="border border-gray-300 px-4 py-2 truncate max-w-xs w-[320px]">
          {item.dashboardName}
        </td>
        <td className="border border-gray-300 px-4 py-2 truncate max-w-xs w-[320px]">
          {item.dashboardDescription}
        </td>
        <td className="border border-gray-300 px-4 py-2  text-center truncate max-w-xs">
          {item.createdAt}
        </td>
        <td className="border border-gray-300 px-4 py-2  text-center truncate max-w-xs">
          {item.updatedAt}
        </td>
        <th
          className={`border border-gray-300 px-4 py-2 text-center ${
            item.status === "COMPLETED" ? "text-green-500" : "text-red-500"
          }`}
        >
          {item.status}
        </th>
        <td className="border border-gray-300 px-4 py-2 cursor-pointer">
          <div className="flex justify-center">
            <img src={edit} className="text-center w-[30px]" />
          </div>
        </td>
      </tr>
    </>
  );
};
export default DashboardListItem;
