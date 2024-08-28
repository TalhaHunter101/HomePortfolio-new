"use client";
import { Card } from "@nextui-org/react";

function CenterSubSection({ data }) {
  return (
    <div className="w-full mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Prediction:</h2>
      
      <div className="flex justify-between items-center space-x-6 w-full">
        <Card className="flex-1 flex items-center justify-center p-4 border border-gray-200 rounded-xl shadow-md">
          <div className="text-center">
            <p className="text-2xl text-blue-600">£{data?.saleEstimate?.lowerPrice}</p>
            <p className="text-sm text-gray-500">Lower Range</p>
          </div>
        </Card>
        <div className="text-3xl text-gray-400">&#8596;</div>
        <Card className="flex-1 flex items-center justify-center p-4 border border-gray-200 rounded-xl shadow-md">
          <div className="text-center">
            <p className="text-2xl text-blue-600">£{data?.saleEstimate?.currentPrice}</p>
            <p className="text-sm text-gray-500">Mid Range</p>
          </div>
        </Card>
        <div className="text-3xl text-gray-400">&#8596;</div>
        <Card className="flex-1 flex items-center justify-center p-4 border border-gray-200 rounded-xl shadow-md">
          <div className="text-center">
            <p className="text-2xl text-blue-600">£{data?.saleEstimate?.upperPrice}</p>
            <p className="text-sm text-gray-500">Higher Range</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CenterSubSection;
