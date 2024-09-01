import { Input, CardBody, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function FinancingCard({
  ltv,
  deposit,
  loanAmount,
  mortgageRate,
  mortgageFees,
  mortgageTerm,
  setLtv,
  setDeposit,
  setLoanAmount,
  setMortgageRate,
  setMortgageFees,
  setMortgageTerm,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-2">
      <CardBody className="p-0">
        <button
          className="w-full flex justify-between items-center p-4 bg-white rounded-xl hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-bold text-purple-900">Financing</span>
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-900 mr-2">£{loanAmount.toLocaleString('en-GB')}/mo</span>
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
                LTV
              </label>
              <Input
                type="text"
                value={ltv.toLocaleString('en-GB')}
                onChange={(e) => setLtv(parseFloat(e.target.value.replace(/,/g, '')))}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Deposit
              </label>
              <Input
                type="text"
                value={deposit.toLocaleString('en-GB')}
                onChange={(e) => setDeposit(parseFloat(e.target.value.replace(/,/g, '')))}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Loan Amount
              </label>
              <Input
                type="text"
                value={loanAmount.toLocaleString('en-GB')}
                onChange={(e) => setLoanAmount(parseFloat(e.target.value.replace(/,/g, '')))}
                startContent={<div className="pointer-events-none text-gray-400">£</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Mortgage / Interest Rate
              </label>
              <Input
                type="text"
                value={mortgageRate}
                onChange={(e) => setMortgageRate(parseFloat(e.target.value))}
                endContent={<div className="pointer-events-none text-gray-400">%</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Mortgage Fees
              </label>
              <Input
                type="text"
                value={mortgageFees}
                onChange={(e) => setMortgageFees(parseFloat(e.target.value))}
                endContent={<div className="pointer-events-none text-gray-400">%</div>}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Mortgage Term (Years)
              </label>
              <Input
                type="text"
                value={mortgageTerm}
                onChange={(e) => setMortgageTerm(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
}
