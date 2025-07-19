import init from "@/assets/dashboard-list/init.svg";
import { LinkButton } from "@/shared/ui/LinkButton";
import { DashboardItem } from "@/types/dashboard-list";
import { formatDate } from "@/utils/dateFormatter";

interface DashboardListItemProps {
  item: DashboardItem;
}

const StatsListItem: React.FC<DashboardListItemProps> = ({ item }) => {
  const base64Id = encodeURIComponent(item.dashboardId);
  const PATH = `/stats/${base64Id}`;

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
          {formatDate(item.createdAt)}
        </td>
        <td className="border border-gray-300 px-4 py-2  text-center truncate max-w-xs">
          {formatDate(item.updatedAt)}
        </td>
        <th
          className={`border border-gray-300 px-4 py-2 text-center text-green-500`}
        >
          {item.dashboardStatus}
        </th>
        <td className="border border-gray-300 px-4 py-2 cursor-pointer">
          <div className="flex justify-center">
            <LinkButton
              path={PATH}
              type="icon"
              state={{ status: item.dashboardStatus }}
            >
              <img
                src={init}
                alt={"입장 아이콘"}
                className="cursor-pointer w-[30px] h-[30px]"
              />
            </LinkButton>
          </div>
        </td>
      </tr>
    </>
  );
};

export default StatsListItem;
