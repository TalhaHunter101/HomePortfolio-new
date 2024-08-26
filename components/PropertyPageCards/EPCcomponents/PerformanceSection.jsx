import React from 'react';

export function PerformanceSection() {
  return (
    <div className="w-1/2 pl-4 flex flex-col justify-start"> 
      <h3 className="font-semibold mb-2">Performance</h3>
      <div className="flex flex-col items-center justify-center h-full">
        <img src="/path-to-placeholder-image.svg" alt="No Recommendations Found" className="w-24 h-24 mb-4" />
        <p className="font-medium text-center">No Recommendations Found</p>
        <p className="text-center text-sm text-gray-500">We didn’t find any recommended improvements for this property.</p>
      </div>
    </div>
  );
}
