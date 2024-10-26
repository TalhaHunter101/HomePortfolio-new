import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react"; 

export default function mainCard() {
  const totalCrimes = 0;
  
  return (
    <Card className="m-4 p-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left section - Crime overview */}
        <div className="w-full lg:w-1/2 p-6 bg-white">
          <Chip className="bg-yellow-200 rounded-full mb-5 px-3 py-1">
            <span className="text-sm font-medium text-gray-700">
              Average crime
            </span>
          </Chip>
          <div className="text-4xl pt-4 font-bold text-gray-800 mb-2">
            {totalCrimes} reported crimes
          </div>
          <p className="text-sm text-gray-500 mb-4">
            in this area in the last 12 months.
          </p>
        </div>

        {/* Right section - Additional statistics (if any) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 text-gray-700 text-base sm:text-xl px-2">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-400">
                Crime Rating Explanation
              </span>
              <span className="text-sm mt-2 text-gray-600">
                If an area has an average crime rating, it means that for every
                1,000 inhabitants, between 140 and 225 residents have been
                affected by a crime.
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
