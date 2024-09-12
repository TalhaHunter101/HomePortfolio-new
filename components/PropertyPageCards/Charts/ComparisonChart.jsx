import { marketCompStore } from "@/store/listingStore";
import { calculateMedian, formatPrice } from "@/utils/Helper";
import React from "react";

const ComparisonChart = ({ data }) => {

  const medianPrice = calculateMedian(data?.pricing?.internalValue);
  const { marketComp } = marketCompStore();

  return (
    <div className="relative flex flex-col bg-white p-8 h-full w-full">
      {/* Heading */}
      <div className="text-lg font-semibold text-gray-800 mb-4">
        <span className="text-black">This Home</span> vs{" "}
        <span className="text-gray-400">
          {marketComp}
        </span>
      </div>

      {/* Circles */}
      <div className="relative w-full h-64">
        {/* First circle (This Home) */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-56 h-56 bg-gradient-to-b from-[#4A6FA5] to-[#395a8a] rounded-full flex items-center justify-center text-center text-white font-bold z-10 shadow-2xl">
          <div>
            <div>This Home</div>
            <div className="text-2xl">
              {formatPrice(data?.pricing?.internalValue)}
            </div>
          </div>
        </div>
        {/* Second circle (Median) */}
        <div className="absolute left-48 top-1/2 transform -translate-y-1/2 w-48 h-48 bg-gradient-to-b from-[#E0E4E8] to-[#C4C9CD] rounded-full flex justify-center items-center text-center text-gray-800 font-bold z-5 shadow-xl">
          <div>
            <div>Median</div>
            <div className="text-2xl">{formatPrice(medianPrice)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
