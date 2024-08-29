import { useState } from "react";
import { Input, Card, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function ExpensesCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2">
      <CardBody className="p-0">
        <button
          className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-bold text-purple-900">Expenses</span>
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900 mr-2">$6,810/mo</span>
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
                Channel Fee
              </label>
              <Input
                type="text"
                defaultValue="3.00"
                endContent={<div className="pointer-events-none text-gray-400">%</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Property Management Fee
              </label>
              <Input
                type="text"
                defaultValue="0.00"
                endContent={<div className="pointer-events-none text-gray-400">%</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Supply Fees
              </label>
              <Input
                type="text"
                defaultValue="0"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Property Taxes
              </label>
              <Input
                type="text"
                defaultValue="2,166"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Insurance
              </label>
              <Input
                type="text"
                defaultValue="800"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                HOA Fees
              </label>
              <Input
                type="text"
                defaultValue="0"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Utilities
              </label>
              <div className="flex">
                <Input
                  type="text"
                  defaultValue="1,538"
                  startContent={<div className="pointer-events-none text-gray-400">$</div>}
                  className="flex-grow"
                />
                <Input
                  type="text"
                  defaultValue="4"
                  endContent={<div className="pointer-events-none text-gray-400">%</div>}
                  className="ml-2 w-20"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Maintenance
              </label>
              <Input
                type="text"
                defaultValue="1,153"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Other Expenses
              </label>
              <div className="flex">
                <Input
                  type="text"
                  defaultValue="0"
                  startContent={<div className="pointer-events-none text-gray-400">$</div>}
                  className="flex-grow"
                />
                <Input
                  type="text"
                  defaultValue="0"
                  endContent={<div className="pointer-events-none text-gray-400">%</div>}
                  className="ml-2 w-20"
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
}
