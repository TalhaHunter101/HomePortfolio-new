import { useState } from "react";
import { Input, Card, CardBody, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function FinancingCard() {
  const [isOpen, setIsOpen] = useState(true);
  const [financingMethod, setFinancingMethod] = useState("Loan");
  const [interestType, setInterestType] = useState("Amortization");

  return (
    <div className="mt-2">
      <CardBody className="p-0">
        <button
          className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-bold text-purple-900">Financing</span>
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900 mr-2">£15,285/mo</span>
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
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Financing Method
              </label>
              <div className="flex space-x-2">
                <Button
                  color={financingMethod === "Loan" ? "secondary" : "default"}
                  onClick={() => setFinancingMethod("Loan")}
                >
                  Buying with a Mortgage
                </Button>
                <Button
                  color={financingMethod === "Cash Only" ? "secondary" : "default"}
                  onClick={() => setFinancingMethod("Cash Only")}
                >
                  Cash Only
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  LTV
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    defaultValue="555,000"
                    startContent={<div className="pointer-events-none text-gray-400">£</div>}
                  />
          
                </div>
              </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Deposite
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    defaultValue="555,000"
                    startContent={<div className="pointer-events-none text-gray-400">£</div>}
                  />
          
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Loan Amount
                </label>
                <Input
                  type="text"
                  defaultValue="2,220,000"
                  startContent={<div className="pointer-events-none text-gray-400">£</div>}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Mortgage / Interest Rate
                </label>
                <Input
                  type="text"
                  defaultValue="7.25"
                  endContent={<div className="pointer-events-none text-gray-400">%</div>}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Mortgage Fees
                </label>
                <Input
                  type="text"
                  defaultValue="1.50"
                  endContent={<div className="pointer-events-none text-gray-400">%</div>}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Interest Type
              </label>
              <div className="flex space-x-2">
                <Button
                  color={interestType === "Amortization" ? "secondary" : "default"}
                  onClick={() => setInterestType("Amortization")}
                >
                  Capital & Interest
                </Button>
                <Button
                  color={interestType === "Interest Only" ? "secondary" : "default"}
                  onClick={() => setInterestType("Interest Only")}
                >
                  Interest Only
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Mortgage Term (Years)
              </label>
              <Input
                type="text"
                defaultValue="30"
              />
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
}