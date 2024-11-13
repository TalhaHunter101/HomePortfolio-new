'use client';
import React from 'react';

const FourthSection = () => {
  return (
    <div className="flex flex-col w-full mt-8 px-4">
      {/* Returns Section */}
      <div className="flex justify-between items-start mb-8">
        <div className="w-full">
          <div className="font-bold text-xl mb-4">Returns</div>
          <div className="grid grid-cols-4 gap-8">
            {/* Return Metrics */}
            <div className="flex flex-col">
              <span className="text-gray-600">NOI</span>
              <span className="text-2xl text-gray-700 font-bold">$23,988</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">CoC ROI</span>
              <span className="text-2xl text-gray-700 font-bold">75.34%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Pro forma cap</span>
              <span className="text-2xl text-gray-700 font-bold">23.99%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Purchase cap</span>
              <span className="text-2xl text-gray-700 font-bold">23.99%</span>
            </div>
          </div>
        </div>
        {/* Help Link */}
        <div className="ml-4 text-blue-500 mt-10 text-xs font-semibold cursor-pointer hover:underline">
          <span>HELP</span>
          <br />
          <span>How are returns calculated?</span>
        </div>
      </div>

      {/* 50% Rule Section */}
      <div className="flex justify-between items-start mb-8">
        <div className="w-full">
          <div className="font-bold text-xl mb-4">50% Rule</div>
          <div className="grid grid-cols-4 gap-8">
            {/* 50% Rule Metrics */}
            <div className="flex flex-col">
              <span className="text-gray-600">Total monthly income</span>
              <span className="text-2xl text-gray-700 font-bold">$2,200</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">50% for expenses</span>
              <span className="text-2xl text-gray-700 font-bold">$1,100</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Monthly P&I</span>
              <span className="text-2xl text-gray-700 font-bold">$429</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">50% rule cash flow</span>
              <span className="text-2xl text-gray-700 font-bold">$670</span>
            </div>
          </div>
        </div>
        {/* Help Link */}
        <div className="ml-4 text-blue-500 text-xs mt-10 font-semibold cursor-pointer hover:underline">
          <span>HELP</span>
          <br />
          <span>What&#39;s the 50% rule?</span>
        </div>
      </div>
    </div>
  );
};

export default FourthSection;
