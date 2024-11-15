import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";

function InvestorReturnCal({ propertyPrice }) {
  const [purchasePrice, setPurchasePrice] = useState(propertyPrice);
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-purple-900 mb-4">
        Investor Return Calculator
      </h2>
      <p className="text-gray-600 mb-4">
        Input a purchase price to calculate returns:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="shadow rounded-xl border border-purple-100 ">
          <p className="text-gray-500 text-sm font-medium mt-2">ROI</p>
          <p className="text-2xl font-medium text-purple-300 mb-2  ">13.7%</p>
        </div>
        <div className="shadow rounded-xl border border-purple-100">
          <p className="text-gray-500 text-sm font-medium mt-2">Net Annual Cash Flow</p>
          <p className="text-2xl font-medium text-purple-300 mb-2">  £246383</p>
        </div>
        <div className="shadow rounded-xl border border-purple-100">
          <p className="text-gray-500 text-sm font-medium mt-2">Gross Yield</p>
          <p className="text-2xl font-medium text-purple-300 mb-2">29.5%</p>
        </div>
        <div className="shadow rounded-xl border border-purple-100">
          <p className="text-gray-500 text-sm font-medium mt-2">Cash on Cash</p>
          <p className="text-2xl font-medium text-purple-300 mb-2">29.5%</p>
        </div>
      </div>
    </div>
  );
}

export default InvestorReturnCal;
