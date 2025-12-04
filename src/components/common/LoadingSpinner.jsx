// src/components/common/LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = ({
  size = "md",
  color = "blue",
  fullScreen = false,
  message = "Loading...",
  showMessage = false,
}) => {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    blue: "border-blue-600",
    gray: "border-gray-600",
    white: "border-white",
    green: "border-green-600",
    red: "border-red-600",
    yellow: "border-yellow-600",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
        />
        {size === "xl" && (
          <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
        )}
      </div>
      {showMessage && message && (
        <p className="mt-3 text-sm font-medium text-gray-600 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export const InlineLoadingSpinner = ({ size = "sm", color = "blue" }) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
  };

  const colorClasses = {
    blue: "border-blue-600",
    gray: "border-gray-600",
    white: "border-white",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin inline-block`}
    />
  );
};

export const PageLoader = ({ message = "Loading page..." }) => (
  <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
    <LoadingSpinner size="lg" color="blue" showMessage={false} />
    <p className="text-gray-600 animate-pulse">{message}</p>
  </div>
);

export const TableLoader = ({ colSpan = 5 }) => (
  <tr>
    <td colSpan={colSpan} className="px-6 py-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <LoadingSpinner size="md" color="blue" showMessage={false} />
        <p className="text-gray-500">Loading data...</p>
      </div>
    </td>
  </tr>
);

export default LoadingSpinner;
