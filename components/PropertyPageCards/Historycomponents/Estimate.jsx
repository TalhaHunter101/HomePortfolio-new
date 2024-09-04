"use client";
import { Chip, Progress } from "@nextui-org/react";
import React from "react";

export function EstimatedRentCard() {
  return (
    <div className="rounded-lg shadow p-6 bg-white">
      <div className="items-center justify-center flex flex-col">
        <Chip radius="lg" className="text-sm font-semibold text-blue-600 bg-primary-50  px-2 py-1 mb-4 inline-block">
          Estimated Monthly Rent
        </Chip>
        <div className="text-4xl font-bold text-gray-800 mb-6">$2,450</div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div className="">$1.31 <br /><span>per sq.ft.</span> </div>
          <div className="mx-2 h-10 border-l border-gray-300"></div>
          <div>$816.67 <br /><span>per bedroom</span> </div>
        </div>
      </div>
      <div className="flex flex-col items-center text-gray-700 text-sm">
        <div className="flex w-full justify-between mb-2">
          <div className="text-md text-gray-500">Low Estimate</div>
          <div className="text-md text-gray-500">High Estimate</div>
        </div>
       
        <Progress color='primary' className="h-full w-full rounded-full bg-gradient-to-r from-primary-400 to-purple-600"  value={60} />
        <div className="flex w-full justify-between mt-2">
          <div className="flex flex-col items-center">
            <span className="font-bold">$1,820</span>
            <span className="text-xs">$0.98/sq.ft.</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">$3,070</span>
            <span className="text-xs">$1.65/sq.ft.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
