import React from "react";
import { Icon } from "@iconify/react";

  
  export function StatusCard({ label, count, iconColor, icon }) {
    return (
      <div className="flex flex-col items-center justify-center w-40 h-24 p-4 border border-gray-200 rounded-md shadow-md">
          <div className="mb-2">
        {/* Render the icon here */}
        
      </div>
        <div className="text-center">
        <p className="text-sm font-medium"><Icon icon={icon} width={20} height={20} className={`inline pb-1 ${iconColor}`} /> {label}</p>
          <p className="text-lg font-bold">{count}</p>
          {/* <p className="text-xs text-gray-500">last 30 days</p> */}
        </div>
      </div>
    );
  }