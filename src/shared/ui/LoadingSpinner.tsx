import { useEffect, useState } from "react";

export const LoadingSpinner = ({
  size = "md",
  color = "blue",
  overlay = false,
  text = "로딩중...",
}: {
  size: "sm" | "md" | "lg" | "xl";
  color: "blue" | "red" | "green" | "purple" | "gray";
  overlay?: boolean;
  text?: string;
}) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 15) % 360);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-16 w-16 border-4",
    xl: "h-24 w-24 border-4",
  };

  const colorClasses = {
    blue: "border-blue-500",
    red: "border-red-500",
    green: "border-green-500",
    purple: "border-purple-500",
    gray: "border-gray-500",
  };

  const spinnerClasses = `rounded-full border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`;

  if (overlay) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-30 z-50">
        <div className="flex flex-col items-center">
          <div
            className={spinnerClasses}
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          {text && <p className="mt-4 text-black font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={spinnerClasses}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      {text && <p className="mt-2 text-gray-600 text-sm">{text}</p>}
    </div>
  );
};
