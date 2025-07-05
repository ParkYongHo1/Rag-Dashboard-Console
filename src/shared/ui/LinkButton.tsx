import { Link } from "react-router-dom";
import { ReactNode } from "react";

export const LinkButton = ({
  name,
  path,
  type,
  isActive = false,
  onClick,
  children,
  state,
}: {
  name?: string;
  path: string;
  type: "default" | "button" | "icon" | "back";
  isActive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  state?: unknown;
}) => {
  const typeStyles = {
    default: "flex items-center gap-2 cursor-pointer hover:text-gray-800",
    button:
      "px-4 py-1.5 bg-blue-500 text-white rounded-[5px] hover:bg-blue-600 hover:cursor-pointer transition-colors ",
    icon: "flex items-center justify-center cursor-pointer",
    back: "flex items-center gap-1 bg-gray-200 shadow-md px-3 py-1.5 rounded-[5px] font-semibold cursor-pointer text-sm hover:bg-gray-300 transition duration-200",
  };

  const linkClasses = `
    ${typeStyles[type]}
    ${isActive ? "text-black font-medium" : "font-medium text-gray-400"}
  `;

  return (
    <Link to={path} className={linkClasses} onClick={onClick} state={state}>
      {children ? children : <span>{name}</span>}
    </Link>
  );
};
