'use client';
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useCalculationsStore } from "@/store/calculationsStore";
import { number } from "zod";

function InvestorReturnCal({ propertyPrice }) {
  const {
    ltv,
    interestRate,
    monthlyPayment,
    annualRevenue,
    deposit,
    purchasePrice,
    totalInvestment,
    netOperatingIncomeMonthly,
    netOperatingIncomeAnnual,
    leveragedNetCashFlowMonthly,
    leveragedNetCashFlowAnnual,
    mortgagePayment,
    monthlyRevenue,
    totalExpenses,
    total_cash_invested,
    ProjectedMonthlyRevenue,
    setNetOperatingIncomeMonthly,
    setTotal_cash_invested,
    setNetOperatingIncomeAnnual,
    setLeveragedNetCashFlowMonthly,
    setLeveragedNetCashFlowAnnual,
  } = useCalculationsStore();

  // const [purchasePrice, setPurchasePrice] = useState(propertyPrice);
  const [roi, setROI] = useState('');
  const [grossYield, setGrossYield] = useState('');
  const [cashOnCash, setCashOnCash] = useState('');
  const [returnOnCapitalEmployed, setReturn_on_captital_employed] = useState('');


  useEffect(() => {

    let net_operating_income_annual = Number(annualRevenue) - Number(totalExpenses);
    let leveraged_net_cash_flow_annual = Number(net_operating_income_annual) - Number(monthlyPayment) * 12;

    let return_on_investment = Number(leveraged_net_cash_flow_annual) * 100 / Number(total_cash_invested);
    let gross_yield = Number(annualRevenue) * 100 / Number(purchasePrice);
    let cash_on_cash = Number(net_operating_income_annual) * 100 / Number(purchasePrice);

    let return_on_captital_employed = Number(net_operating_income_annual) * 100 / Number(totalInvestment)
    let net_yield = Number(leveraged_net_cash_flow_annual) * 100 / Number(total_cash_invested)
    let cap_rate = Number(net_operating_income_annual) * 100 / Number(total_cash_invested)
    
    

    // set the values
    setLeveragedNetCashFlowAnnual?.(leveraged_net_cash_flow_annual);
    setROI(return_on_investment.toFixed(2));
    setGrossYield(gross_yield.toFixed(2));
    setCashOnCash(cash_on_cash.toFixed(2));
    setReturn_on_captital_employed(return_on_captital_employed.toFixed(2));
  }, [ltv, interestRate, deposit, purchasePrice, annualRevenue, totalExpenses, monthlyPayment, totalInvestment, total_cash_invested]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-purple-900 mb-4">
        Investor Return Calculator
      </h2>
      <p className="text-gray-600 mb-4">
        Input a purchase price to calculate returns:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="shadow rounded-xl border border-purple-100 ">
          <p className="text-gray-400 text-sm font-medium mt-2">ROI</p>
          <p className="text-xl font-bold text-purple-900 mb-2  ">{roi?.toLocaleString('en-GB')}%</p>
        </div>
        <div className="shadow rounded-xl border border-purple-100">
          <p className="text-gray-400 text-sm font-medium mt-2">Net Annual Cash Flow</p>
          <p className="text-xl font-bold text-purple-900 mb-2">  £ {parseInt(leveragedNetCashFlowAnnual)?.toLocaleString('en-GB')}</p>
        </div>
        <div className="shadow rounded-xl border border-purple-100">
          <p className="text-gray-400 text-sm font-medium mt-2">Gross Yield</p>
          <p className="text-xl font-bold text-purple-900 mb-2">{grossYield?.toLocaleString('en-GB')}%</p>
        </div>
        <div className="shadow rounded-xl border border-purple-100">
          <p className="text-gray-400 text-sm font-medium mt-2">ROCE</p>
          <p className="text-xl font-bold text-purple-900 mb-2">{returnOnCapitalEmployed?.toLocaleString('en-GB')}%</p>
        </div>
      </div>
    </div>
  );
}

export default InvestorReturnCal;
