import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";

function InvestorReturnCal({propertyPrice}) {
  const [purchasePrice, setPurchasePrice] = useState(propertyPrice);
  return (
    <div className=" mt-10">
      <CardBody>
        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          Investor Return Calculator
        </h2>
        <p className="text-gray-600 mb-4">
          Input a purchase price to calculate returns:
        </p>

        <div className="flex gap-2 mb-6">
          <Input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            labelPlacement="outside"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">£</span>
              </div>
            }
          />
          <Button color="secondary">Calculate</Button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-600">Cap Rate</p>
            <p className="text-xl font-bold text-purple-900">13.7%</p>
          </div>
          <div>
            <p className="text-gray-600">Gross Yield</p>
            <p className="text-xl font-bold text-purple-900">16.6%</p>
          </div>
          <div>
            <p className="text-gray-600">Cash-on-Cash</p>
            <p className="text-xl font-bold text-purple-900">29.5%</p>
          </div>
        </div>
      </CardBody>
    </div>
  );
}

export default InvestorReturnCal;
