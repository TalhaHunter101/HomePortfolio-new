import { Input, CardBody, Slider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function TotalInvestmentCard({
  purchasePrice,
  closingCostsPercentage,
  refurbCost,
  fees,
  furnishingCost,
  otherExpenses,
  closingCosts,
  setClosingCosts,
  setPurchasePrice,
  setClosingCostsPercentage,
  setRefurbCost,
  setFees,
  setFurnishingCost,
  setOtherExpenses,
  totalInvestment,
  stampDuty
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2">
      <CardBody className="p-0">
        <button
          className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-bold text-purple-900">Total Investment</span>
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900 mr-2">£{totalInvestment.toLocaleString('en-GB')}</span>
            <Icon
              icon="mdi:chevron-down"
              className={`w-6 h-6 text-purple-900 transition-transform duration-300 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </button>

        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Purchase Price
              </label>
              <Input
                type="text"
                value={purchasePrice.toLocaleString('en-GB')}
                onChange={(e) => setPurchasePrice(parseFloat(e.target.value.replace(/,/g, '')))}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Stamp Duty
              </label>
              <Input
                type="text"
                value={stampDuty.toLocaleString('en-GB')}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Closing Costs percentage
              </label>
              {/* <Input
                type="text"
                value={closingCostsPercentage}
                onChange={(e) => setClosingCostsPercentage(typeof(e.target.value) !== NaN && parseFloat(e.target.value))}
                endContent={<div className="pointer-events-none text-gray-400">%</div>}
              /> */}
              <Slider
                value={closingCostsPercentage}
                onChange={(value) => setClosingCostsPercentage(value)}
                minValue={0}
                maxValue={10}
                step={0.1}
                endContent={<div className="pointer-events-none text-gray-400">{closingCostsPercentage}%</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Closing Costs
              </label>
              <Input
                type="text"
                value={closingCosts}
                onChange={(e) => setClosingCosts(parseFloat(e.target.value))}
                endContent={<div className="pointer-events-none text-gray-400">€</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Immediate Repairs (Refurb)
              </label>
              <Input
                type="text"
                value={refurbCost}
                onChange={(e) => setRefurbCost(parseFloat(e.target.value))}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Furnishing Costs
              </label>
              <Input
                type="text"
                value={furnishingCost}
                onChange={(e) => setFurnishingCost(parseFloat(e.target.value))}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Other Initial Expenses
              </label>
              <Input
                type="text"
                value={otherExpenses}
                onChange={(e) => setOtherExpenses(parseFloat(e.target.value))}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
}
