import { useState, useMemo } from "react";
import { Input, Card, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function TotalInvestmentCard({ propertyPrice }) {
  const [isOpen, setIsOpen] = useState(false);

  const stampDuty = useMemo(() => {
    if (propertyPrice < 40000) {
      return 0;
    } else if (propertyPrice < 250000) {
      return propertyPrice * 0.03;
    } else if (propertyPrice < 925000) {
      return ((propertyPrice - 250000) * 0.08) + 7500;
    } else if (propertyPrice < 1500000) {
      return ((propertyPrice - 925000) * 0.13) + 61500;
    } else {
      return ((propertyPrice - 1500000) * 0.15) + 136250;
    }
  }, [propertyPrice]);

  return (
    <div className="mt-2">
      <CardBody className="p-0">
        <button
          className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-bold text-purple-900">Total Investment</span>
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900 mr-2">£{propertyPrice}</span>
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
                defaultValue="0.00"
                endContent={<div className="pointer-events-none text-gray-400">%</div>}
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
                Closing Costs
              </label>
              <Input
                type="text"
                defaultValue="2.75"
                endContent={<div className="pointer-events-none text-gray-400">%</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Immediate Repairs (Refurb)
              </label>
              <Input
                type="text"
                defaultValue={(5000).toLocaleString('en-GB')}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Furnishing Costs
              </label>
              <Input
                type="text"
                defaultValue="0"
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Other Initial Expenses
              </label>
              <Input
                type="text"
                defaultValue="0"
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
}
