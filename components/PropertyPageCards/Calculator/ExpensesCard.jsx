import { useEffect, useState } from "react";
import { Input, CardBody } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export default function ExpensesCard({
  channelFee = 3.00,
  supplyFees = 0,
  groundRent = 2166,
  insurance = 800,
  utilities = 1538,
  maintenance = 1153,
  otherExpenses = 0,
  propertyManagementFeePercentage,
  setPropertyManagementFeePercentage,
  propertyManagementFee,
  setPropertyManagementFee,
  monthlyRevenue

}) {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setPropertyManagementFee( (propertyManagementFeePercentage / 100) * monthlyRevenue)
    setPropertyManagementFee(propertyManagementFee * monthlyRevenue / 100);
    
  },[propertyManagementFeePercentage, monthlyRevenue, setPropertyManagementFee, propertyManagementFee]);


  return (
    <div className="mt-2">
      <CardBody className="p-0">
        <button
          className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-bold text-purple-900">Expenses</span>
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900 mr-2">£{(channelFee + propertyManagementFee + supplyFees + groundRent + insurance + utilities + maintenance + otherExpenses).toLocaleString('en-GB')}/mo</span>
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
            {/* <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Channel Fee
              </label>
              <Input
                type="text"
                defaultValue={channelFee}
                endContent={
                  <div className="pointer-events-none text-gray-400">%</div>
                }
              />
            </div> */}
            <div className="flex items-center">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Property Management Fee
                </label>
                <Input
                  type="text"
                  defaultValue={propertyManagementFee}
                  startContent={
                    <div className="pointer-events-none text-gray-400">£</div>
                  }
                  onChange={(e) => {
                    const value = e.target.value
                    setPropertyManagementFee(value);
                    // percent of monthly revenue
                    // setPropertyManagementFeePercentage( (value / monthlyRevenue) * 100);
                  }
                  }
                />
              </div>
              <span className="mx-2">OR</span>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  .
                </label>
                <Input
                  type="text"
                  defaultValue="10"
                  endContent={
                    <div className="pointer-events-none text-gray-400">%</div>
                  }

                  onChange={(e) => {
                    const value = e.target.value
                    setPropertyManagementFeePercentage(value);
                    // setPropertyManagementFee(value * monthlyRevenue / 100);
                  } }

                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
              Service Charge
              </label>
              <Input
                type="text"
                defaultValue={supplyFees}
                startContent={
                  <div className="pointer-events-none text-gray-400">£</div>
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Ground Rent
              </label>
              <Input
                type="text"
                defaultValue={groundRent}
                startContent={
                  <div className="pointer-events-none text-gray-400">£</div>
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Insurance
              </label>
              <Input
                type="text"
                defaultValue={insurance}
                startContent={
                  <div className="pointer-events-none text-gray-400">£</div>
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Utilities
              </label>
              <div className="flex">
                <Input
                  type="text"
                  defaultValue={utilities}
                  startContent={
                    <div className="pointer-events-none text-gray-400">£</div>
                  }
                  className="flex-grow"
                />
                <Input
                  type="text"
                  defaultValue="4"
                  endContent={
                    <div className="pointer-events-none text-gray-400">%</div>
                  }
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
                defaultValue={maintenance}
                startContent={
                  <div className="pointer-events-none text-gray-400">£</div>
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Other Expenses
              </label>
              <div className="flex">
                <Input
                  type="text"
                  defaultValue={otherExpenses}
                  startContent={
                    <div className="pointer-events-none text-gray-400">£</div>
                  }
                  className="flex-grow"
                />
                <Input
                  type="text"
                  defaultValue="0"
                  endContent={
                    <div className="pointer-events-none text-gray-400">%</div>
                  }
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

