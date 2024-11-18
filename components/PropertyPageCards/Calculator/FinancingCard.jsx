'use client';

import { Input, CardBody, Button, Slider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useEffect, useState, useRef, useMemo } from "react";
import { useCalculationsStore } from "../../../store/calculationsStore";

export default function FinancingCard() {
  const [isOpen, setIsOpen] = useState(false);
  const isUpdating = useRef(false);
  const {
    purchasePrice,
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

  const [bankRate, setBankRate] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/indevisual/get-listing-by-id`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json(); // Parse JSON response
        console.log(parseFloat(result[0].replace("%", "")), "response")
        setBankRate(parseFloat(result[0].replace("%", "")));
      } catch (error) {
        console.error(error.message); // Handle any errors
      } finally {
        console.log(false); // Set loading to false once fetching is complete
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []);

  // Combined useEffect for LTV, deposit, and loan amount calculations
  useEffect(() => {
    if (isUpdating.current) return;
    isUpdating.current = true;

    if (totalInvestment > 0) {
      if (ltv > 0) {
        const newLoanAmount = purchasePrice * (ltv / 100);
        const newDeposit = purchasePrice - newLoanAmount;
        setDeposit?.(newDeposit);
        setLoanAmount?.(newLoanAmount);
      } else if (deposit > 0) {
        const newLtv = 1 - (deposit / purchasePrice) * 100;
        const newLoanAmount = purchasePrice - deposit;
        setLtv?.(newLtv);
        setLoanAmount?.(newLoanAmount);
      }
    }

    isUpdating.current = false;
  }, [ltv, deposit, totalInvestment, setDeposit, setLoanAmount, setLtv]);

  // Calculate monthly mortgage payment
  useEffect(() => {
    if (loanAmount > 0 && interestRate > 0 && mortgageTerm > 0) {
      const monthlyinterestrate = Number(interestRate) / 100 / 12;
      const numberOfPayments = Number(mortgageTerm) * 12;
      let payment = 0;

      if (interestType === "capital_Interest") {

        const temp = window.Math.pow((1 + Number(monthlyinterestrate)), Number(numberOfPayments))
        console.log("temptemptemp",temp)
        payment = (loanAmount * monthlyinterestrate * temp) / (temp - 1);
      } else if (interestType === "Interest_only") {
        payment = loanAmount * monthlyinterestrate;
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
      setInterestRate?.(4.75);
      // setMortgageFees?.(0);
      setMortgageTerm?.(30);
      setInterestType?.("capital_Interest");
    }
  }, [financingMethod, setLtv, setDeposit, setLoanAmount, setInterestRate, setMortgageTerm, setInterestType, setMonthlyPayment]);
  const handleBankRate = (e) =>{
    setBankRate(e.target.value);
    setInterestRate?.(Number(e.target.value))
  }
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
              £{parseInt(monthlyPayment)?.toLocaleString('en-GB')}/mo
            </span>
          )}
          <Icon
            icon="mdi:chevron-down"
            className={`w-6 h-6 text-purple-900 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
              }`}
          />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
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
                <Input
                  type="number"
                  defaultValue={75}
                  onChange={(e) => setLtv?.(Number(e.target.value))}
                  min={0}
                  max={100}
                  step={0.1}
                  startContent={
                    <div className="pointer-events-none">
                      %
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
                  value={parseInt(deposit)?.toLocaleString('en-GB')}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/,/g, ''));
                    if (!isNaN(value) && value !== deposit) setDeposit?.(value);
                  }}
                  startContent={
                    <div className="pointer-events-none">£</div>
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Loan Amount
                </label>
                <Input
                  type="text"
                  value={parseInt(loanAmount)?.toLocaleString('en-GB')}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/,/g, ''));
                    if (!isNaN(value) && value !== loanAmount)
                      setLoanAmount?.(value);
                  }}
                  startContent={
                    <div className="pointer-events-none">£</div>
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Mortgage / Interest Rate
                </label>
                <Input
                  type="number"
                  value={bankRate}
                  //  defaultValue={bankRate?.toLocaleString('en-GB')}
                  onChange={(e) => handleBankRate(e)}
                  min={0}
                  max={30}
                  step={0.1}
                  startContent={
                    <div className="pointer-events-none">
                      %
                    </div>
                  }
                />
              </div>
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

              {interestType === 'capital_Interest' && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Mortgage Term (Years)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    step={1}
                    defaultValue={30}
                    onChange={(e) => setMortgageTerm?.(Number(e.target.value))}
                    
                  />
                </div>
              )}


            </>
          )}
        </div>
      </div>
    </div>
  );
}
