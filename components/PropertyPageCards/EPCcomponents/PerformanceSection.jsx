import { Image } from "@nextui-org/react";
import React from "react";

export function PerformanceSection({ recData }) {
  return (
    <div className="w-1/2 pl-4 flex flex-col justify-start">
      <h3 className="font-semibold mb-2">Performance</h3>

      {recData && recData.length > 0 ? (
        recData.map((item, index) => (
          <div key={index} className="flex flex-col">
            <p className="font-semibold text-lg sm:text-lg md:text-lg mt-3">
              {`Step ${index + 1}:  ${item?._source.IMPROVEMENT_ID_TEXT}`}
            </p>
            <div className="flex flex-col items-center sm:flex-row justify-between mt-2 sm:mt-2 md:mt-2">
              <span className="mb-2 sm:mb-0">Typical installation cost</span>
              <span className="text-base sm:text-base md:text-base">
                {item?._source?.INDICATIVE_COST}
              </span>
            </div>
            {index < recData.length - 1 && (
              <div className="border-t border-gray-400 w-full mt-4"></div>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Image
            src="/performance.svg"
            alt="No Recommendations Found"
            className="w-24 h-24 mb-4"
          />
          <p className="font-medium text-center">No Recommendations Found</p>
          <p className="text-center text-sm text-gray-500">
            We didn’t find any recommended improvements for this property.
          </p>
        </div>
      )}
    </div>
  );
}
