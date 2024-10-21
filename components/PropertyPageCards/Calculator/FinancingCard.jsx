import { Input, CardBody, Button, Slider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import { useCalculationsStore } from "../../../store/calculationsStore";

export default function FinancingCard() {
  const [isOpen, setIsOpen] = useState(true);
  const isUpdating = useRef(false);
  const {
    financingMethod,
    ltv,
    deposit,
    loanAmount,
    interestRate,
    mortgageFees,
    mortgageTerm,
    interestType,
    monthlyPayment,
    setFinancingMethod,
    setLtv,
    setDeposit,
    setLoanAmount,
    setInterestRate,
    setMortgageFees,
    setMortgageTerm,
    setInterestType,
    setMonthlyPayment,
    totalInvestment,
  } = useCalculationsStore();

  // Combined useEffect for LTV, deposit, and loan amount calculations
  useEffect(() => {
    if (isUpdating.current) return;
    isUpdating.current = true;

    if (totalInvestment > 0) {
      if (ltv > 0) {
        const newDeposit = totalInvestment * (ltv / 100);
        const newLoanAmount = totalInvestment - newDeposit;
        setDeposit?.(newDeposit);
        setLoanAmount?.(newLoanAmount);
      } else if (deposit > 0) {
        const newLtv = (deposit / totalInvestment) * 100;
        const newLoanAmount = totalInvestment - deposit;
        setLtv?.(newLtv);
        setLoanAmount?.(newLoanAmount);
      }
    }

    isUpdating.current = false;
  }, [ltv, deposit, totalInvestment, setDeposit, setLoanAmount, setLtv]);

  // Calculate monthly mortgage payment
  useEffect(() => {
    if (loanAmount > 0 && interestRate > 0 && mortgageTerm > 0) {
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = mortgageTerm * 12;
      let payment = 0;

      if (interestType === "capital_Interest") {
        payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      } else if (interestType === "Interest_only") {
        payment = loanAmount * monthlyRate;
      }

      if (payment !== monthlyPayment) setMonthlyPayment?.(payment);
    }
  }, [loanAmount, interestRate, mortgageTerm, interestType, monthlyPayment, setMonthlyPayment]);

  // Calculation when Financing method changes
  useEffect(() => {
    if (financingMethod === "cash") {
      setLtv?.(0);
      setDeposit?.(0);
      setLoanAmount?.(0);
      setInterestRate?.(0);
      // setMortgageFees?.(0);
      setMortgageTerm?.(0);
      setInterestType?.("capital_Interest");
      setMonthlyPayment?.(0);
    }

    if (financingMethod === "mortgage") {
      setLtv?.(75);
      setInterestRate?.(11);
      // setMortgageFees?.(0);
      setMortgageTerm?.(5);
      setInterestType?.("capital_Interest");
    }
  }, [financingMethod, setLtv, setDeposit, setLoanAmount, setInterestRate, setMortgageTerm, setInterestType, setMonthlyPayment]);

  return (
    <div className="mt-2">
      <button
        className="w-full flex justify-between items-center p-4 bg-purple-50 shadow rounded-xl hover:bg-purple-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-md lg:text-xl font-bold text-purple-900">Financing</span>
        <div className="flex items-center">
          {monthlyPayment === 0 ? (
            <span className="text-md lg:text-xl font-bold text-purple-900 mr-2">-</span>
          ) : (
            <span className="text-md lg:text-xl font-bold text-purple-900 mr-2">
              £{monthlyPayment?.toLocaleString('en-GB')}/mo
            </span>
          )}
          <Icon
            icon="mdi:chevron-down"
            className={`w-6 h-6 text-purple-900 transition-transform duration-300 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-2 text-gray-600 font-medium">Financing Method</div>
            <div className="flex gap-4">
              <Button
                color="secondary"
                variant={financingMethod === 'mortgage' ? 'solid' : 'bordered'}
                onClick={() => setFinancingMethod?.('mortgage')}
              >
                Mortgage
              </Button>
              <Button
                color="secondary"
                variant={financingMethod === 'cash' ? 'solid' : 'bordered'}
                onClick={() => setFinancingMethod?.('cash')}
              >
                Cash Only
              </Button>
            </div>
          </div>

          {financingMethod === 'mortgage' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  LTV
                </label>
                <Slider
                  value={ltv || 0}
                  onChange={(e) => setLtv?.(e)}
                  min={0}
                  max={100}
                  step={1}
                  endContent={
                    <div className="pointer-events-none text-gray-400">
                      {ltv || 0}%
                    </div>
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Deposit
                </label>
                <Input
                  type="text"
                  value={deposit?.toLocaleString('en-GB')}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value.replace(/,/g, ''));
                    if (!isNaN(value) && value !== deposit) setDeposit?.(value);
                  }}
                  startContent={
                    <div className="pointer-events-none text-gray-400">£</div>
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Loan Amount
                </label>
                <Input
                  type="text"
                  value={loanAmount?.toLocaleString('en-GB')}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value.replace(/,/g, ''));
                    if (!isNaN(value) && value !== loanAmount)
                      setLoanAmount?.(value);
                  }}
                  startContent={
                    <div className="pointer-events-none text-gray-400">£</div>
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Mortgage / Interest Rate
                </label>
                <Slider
                  value={interestRate || 0}
                  onChange={(e) => setInterestRate?.(e)}
                  min={0}
                  max={30}
                  step={0.1}
                  endContent={
                    <div className="pointer-events-none text-gray-400">
                      {interestRate || 0}%
                    </div>
                  }
                />
              </div>

              {interestType === 'capital_Interest' && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Mortgage Term (Years)
                  </label>
                  <Slider
                    value={mortgageTerm || 0}
                    onChange={(e) => setMortgageTerm?.(e)}
                    min={0}
                    max={50}
                    step={1}
                    endContent={
                      <div className="pointer-events-none text-gray-400">
                        {mortgageTerm || 0} years
                      </div>
                    }
                  />
                </div>
              )}

              <div>
                <div className="mb-2 text-gray-600 font-medium">Interest Type</div>
                <div className="flex gap-4">
                  <Button
                    color="secondary"
                    variant={
                      interestType === 'capital_Interest' ? 'solid' : 'bordered'
                    }
                    onClick={() => setInterestType?.('capital_Interest')}
                  >
                    Capital & Interest
                  </Button>
                  <Button
                    color="secondary"
                    variant={
                      interestType === 'Interest_only' ? 'solid' : 'bordered'
                    }
                    onClick={() => setInterestType?.('Interest_only')}
                  >
                    Interest Only
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
