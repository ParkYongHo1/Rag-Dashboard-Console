import { Link } from "react-router-dom";
import { ReactNode } from "react";
export const LinkButton = ({
  name,
  path,
  type,
  isActive = false,
  onClick,
  children,
}: {
  name?: string;
  path: string;
  type: "default" | "button" | "icon";
  isActive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}) => {
  const typeStyles = {
    default: "flex items-center gap-2 cursor-pointer hover:text-gray-800",
    button:
      "px-4 py-1.5 bg-blue-500 text-white rounded-[5px] hover:bg-blue-600 hover:cursor-pointer transition-colors ",
    icon: "flex items-center justify-center cursor-pointer",
  };
  const linkClasses = `
   ${typeStyles[type]}
   ${isActive ? "text-black font-medium" : "font-medium text-gray-400"}
  `;
  return (
    <Link to={path} className={linkClasses} onClick={onClick}>
      {children ? children : <span>{name}</span>}
    </Link>
  );
};
