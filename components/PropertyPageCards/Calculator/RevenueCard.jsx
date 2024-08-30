import { useState } from "react";
import { Input, Card, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function RevenueCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-2">
      <CardBody className="p-0">
        <button
          className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-bold text-purple-900">Revenue</span>
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900 mr-2">£38,447/mo</span>
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
                Monthly Revenue
              </label>
              <Input
                type="text"
                defaultValue="38,447"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Annual Revenue
              </label>
              <Input
                type="text"
                defaultValue="461,360"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Projected Monthly Rent
              </label>
              <Input
                type="text"
                defaultValue="1,264"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
              <p className="text-xs text-gray-500 mt-1">
                $1264 is the projected monthly rent estimates based on comparable for this specific property, according to our valuation tool.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Other Income
              </label>
              <Input
                type="text"
                defaultValue="0"
                startContent={<div className="pointer-events-none text-gray-400">$</div>}
              />
            </div>


           
          </div>
        </div>
      </CardBody>
    </div>
  );
}
