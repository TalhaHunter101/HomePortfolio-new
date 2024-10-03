import { marketCompStore } from "@/store/listingStore";
import { formatPrice } from "@/utils/Helper";
import React from "react";

const ComparisonChart = ({ data }) => {
  const { marketComp, medianPrice } = marketCompStore();

  return (
    <div className="relative flex flex-col bg-white p-8 h-full w-full max-w-md md:max-w-full">
      {/* Heading */}
      <div className="text-lg font-semibold text-gray-800 mb-4">
        <span className="text-black">This Home</span> vs{" "}
        <span className="text-gray-400">{marketComp}</span>
      </div>

      {/* Circles */}
      <div className="w-full h-64 flex items-center justify-center md:justify-start relative">
        {/* Mobile layout: Circles centered */}
        <div className="flex flex-col items-center space-y-4 md:hidden">
          {/* First circle (This Home) */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-b from-[#4A6FA5] to-[#395a8a] rounded-full flex items-center justify-center text-center text-white font-bold shadow-2xl">
            <div>
              <div>This Home</div>
              <div className="text-xl sm:text-2xl">
                {formatPrice(data?.pricing?.internalValue)}
              </div>
            </div>
          </div>
          {/* Second circle (Median) */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-b from-[#E0E4E8] to-[#C4C9CD] rounded-full flex items-center justify-center text-center text-gray-800 font-bold shadow-xl">
            <div>
              <div>Median</div>
              <div className="text-xl sm:text-2xl">
                {formatPrice(medianPrice)}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop layout: Overlapping circles */}
        <div className="hidden md:block w-full h-full relative">
          {/* First circle (This Home) */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-56 h-56 bg-gradient-to-b from-[#4A6FA5] to-[#395a8a] rounded-full flex items-center justify-center text-center text-white font-bold shadow-2xl z-10">
            <div>
              <div>This Home</div>
              <div className="text-2xl">
                {formatPrice(data?.pricing?.internalValue)}
              </div>
            </div>
          </div>
          {/* Second circle (Median) */}
          <div className="absolute top-1/2 left-40 transform -translate-y-1/2 w-56 h-56 bg-gradient-to-b from-[#E0E4E8] to-[#C4C9CD] rounded-full flex items-center justify-center text-center text-gray-800 font-bold shadow-xl">
            <div>
              <div>Median</div>
              <div className="text-2xl">
                {formatPrice(medianPrice)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
