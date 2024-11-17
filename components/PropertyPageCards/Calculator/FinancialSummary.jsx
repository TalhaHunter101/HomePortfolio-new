'use client';
import React, { useEffect, useState } from 'react';
import { useCalculationsStore } from '../../../store/calculationsStore';

export default function FinancialSummary() {
  const {
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
    total_cash_invested,
    totalExpenses,
    ProjectedMonthlyRevenue,
    setNetOperatingIncomeMonthly,
    setNetOperatingIncomeAnnual,
    setLeveragedNetCashFlowMonthly,
    setTotal_cash_invested,
    setLeveragedNetCashFlowAnnual,
  } = useCalculationsStore();

  useEffect(() => {
    let net_operating_income_monthly = Number(annualRevenue) / 12 - Number(totalExpenses);
    let net_operating_income_annual = Number(net_operating_income_monthly) * 12;
    let leveraged_net_cash_flow_annual = Number(net_operating_income_annual) - Number(monthlyPayment) * 12;
    let leveraged_net_cash_flow_monthly = Number(leveraged_net_cash_flow_annual) / 12;
    let total_cash_invested = Number(deposit) + Number(totalInvestment) - Number(purchasePrice)

    // set the values
    setNetOperatingIncomeMonthly?.(net_operating_income_monthly);
    setNetOperatingIncomeAnnual?.(net_operating_income_annual);
    setLeveragedNetCashFlowMonthly?.(leveraged_net_cash_flow_monthly);
    setLeveragedNetCashFlowAnnual?.(leveraged_net_cash_flow_annual);
    setTotal_cash_invested?.(total_cash_invested);
  }, [purchasePrice, deposit, monthlyRevenue, totalExpenses, total_cash_invested, mortgagePayment, ProjectedMonthlyRevenue, setNetOperatingIncomeMonthly, setNetOperatingIncomeAnnual, setLeveragedNetCashFlowMonthly, setLeveragedNetCashFlowAnnual, setTotal_cash_invested]);

  return (
    <div className="mt-4 mx-4">
      <div className="flex flex-col sm:flex-row py-2 justify-between items-center">
        <span className="text-lg font-bold text-purple-900">
          Total Cash Invested
        </span>
        <span className="text-lg font-bold text-black">
          £{parseInt(total_cash_invested)?.toLocaleString('en-GB')}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row py-2 justify-between items-center mt-2 my-4">
        <span className="text-lg font-bold text-purple-900">
          Net Operating Income
        </span>
        <span className="text-lg font-bold text-black">
          £{parseInt(netOperatingIncomeAnnual)?.toLocaleString('en-GB')}/yr &#x2022; £{parseInt(netOperatingIncomeMonthly)?.toLocaleString('en-GB')}/mo
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <span className="text-lg font-bold text-purple-900">
          Leveraged Net Cash Flow
        </span>
        <span className="text-lg font-bold text-black">
          £{parseInt(Number(leveragedNetCashFlowAnnual))?.toLocaleString('en-GB')}/yr &#x2022; £{parseInt(leveragedNetCashFlowMonthly)?.toLocaleString('en-GB')}/mo
        </span>
      </div>
    </div>
  );
}
