import React from "react";

  
  export function StatusCard({ label, count, iconColor }) {
    return (
      <div className="flex flex-col items-center justify-center w-40 h-24 p-4 border border-gray-200 rounded-md">
        <div className={`w-6 h-6 ${iconColor} rounded-full mb-2`}></div>
        <div className="text-center">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-lg font-bold">{count}</p>
          <p className="text-xs text-gray-500">last 30 days</p>
        </div>
      </div>
    );
  }