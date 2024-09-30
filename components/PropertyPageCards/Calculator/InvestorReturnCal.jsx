import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";

function InvestorReturnCal({propertyPrice}) {
  const [purchasePrice, setPurchasePrice] = useState(propertyPrice);
  return (
    <div className="mt-10">
  
        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          Investor Return Calculator
        </h2>
        <p className="text-gray-600 mb-4">
          Input a purchase price to calculate returns:
        </p>

       
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-gray-600">ROI</p>
            <p className="text-xl font-bold text-purple-900">13.7%</p>
          </div>
          <div>
            <p className="text-gray-600">Net Annual Cash Flow</p>
            <p className="text-xl font-bold text-purple-900">£246383</p>
          </div>
          <div>
            <p className="text-gray-600">Gross Yield</p>
            <p className="text-xl font-bold text-purple-900">29.5%</p>
          </div>

          <div>
            <p className="text-gray-600">Cash on Cash</p>
            <p className="text-xl font-bold text-purple-900">29.5%</p>
          </div>
        </div>
    </div>
  );
}

export default InvestorReturnCal;
