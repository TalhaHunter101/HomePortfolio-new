import { useEffect, useState } from "react";
import { Input, CardBody, Slider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useCalculationsStore } from "../../../store/calculationsStore";
import { calculateStampDuty } from "@/utils/calculationHelper";

export default function TotalInvestmentCard() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    purchasePrice,
    setPurchasePrice,
    stampDuty,
    setStampDuty,
    closingCostPercentage,
    setClosingCostPercentage,
    closingCost,
    setClosingCost,
    refurbishmentCost,
    setRefurbishmentCost,
    furnishingsCost,
    setFurnishingsCost,
    otherExpenses,
    setOtherExpenses,
    totalInvestment,
    setTotalInvestment,
  } = useCalculationsStore();

  // Calculate stamp duty and total investment
  useEffect(() => {
    const stampDuty = calculateStampDuty(purchasePrice);
    const totalInvestment = 
      Number(purchasePrice) + 
      Number(stampDuty) + 
      Number(closingCost) + 
      Number(refurbishmentCost) + 
      Number(furnishingsCost) + 
      Number(otherExpenses);
    setStampDuty(stampDuty);
    setTotalInvestment(totalInvestment);
  }, [purchasePrice, closingCost, refurbishmentCost, furnishingsCost, otherExpenses]);

  // Calculate closing cost based on percentage
  useEffect(() => {
    const closingCosts = purchasePrice * (closingCostPercentage / 100);
    setClosingCost(closingCosts);
  }, [purchasePrice, closingCostPercentage]);

  // Update closing cost percentage when closing cost changes
  useEffect(() => {
    if (purchasePrice > 0) {
      const percentage = ((closingCost / purchasePrice) * 100).toFixed(2);
      setClosingCostPercentage(percentage);
    }
  }, [closingCost]);

  return (
    <div className="mt-2">
        <button
          className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-bold text-purple-900">Total Investment</span>
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900 mr-2">£{totalInvestment?.toLocaleString('en-GB')}</span>
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
                value={purchasePrice?.toLocaleString('en-GB')}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/,/g, ''));
                  setPurchasePrice(isNaN(value) ? 0 : value);
                }}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Stamp Duty
              </label>
              <Input
                type="text"
                value={stampDuty?.toLocaleString('en-GB')}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Closing Costs percentage
              </label>
              <Slider
                value={closingCostPercentage}
                onChange={(value) => setClosingCostPercentage(value)}
                minValue={0}
                maxValue={10}
                step={0.1}
                endContent={<div className="pointer-events-none text-gray-400">{closingCostPercentage}%</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Closing Costs
              </label>
              <Input
                type="text"
                min={0}
                max={purchasePrice}
                value={closingCost?.toLocaleString('en-GB')}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/,/g, ''));
                  setClosingCost(isNaN(value) ? 0 : value);
                }}
                endContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Immediate Repairs (Refurb)
              </label>
              <Input
                type="text"
                value={refurbishmentCost?.toLocaleString('en-GB')}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/,/g, ''));
                  setRefurbishmentCost(isNaN(value) ? 0 : value);
                }}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Furnishing Costs
              </label>
              <Input
                type="text"
                value={furnishingsCost?.toLocaleString('en-GB')}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/,/g, ''));
                  setFurnishingsCost(isNaN(value) ? 0 : value);
                }}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Other Initial Expenses
              </label>
              <Input
                type="text"
                value={otherExpenses?.toLocaleString('en-GB')}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace(/,/g, ''));
                  setOtherExpenses(isNaN(value) ? 0 : value);
                }}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
          </div>
        </div>
    </div>
  );
}