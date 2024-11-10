import React, { useEffect } from 'react';
import { useCalculationsStore } from '../../../store/calculationsStore';

export default function FinancialSummary() {
  const {
    totalInvestment,
    netOperatingIncomeMonthly,
    netOperatingIncomeAnnual,
    leveragedNetCashFlowMonthly,
    leveragedNetCashFlowAnnual,
    mortgagePayment,
    monthlyRevenue,
    totalExpenses,
    ProjectedMonthlyRevenue,
    setNetOperatingIncomeMonthly,
    setNetOperatingIncomeAnnual,
    setLeveragedNetCashFlowMonthly,
    setLeveragedNetCashFlowAnnual,
  } = useCalculationsStore();


  useEffect(() => {
    let net_operating_income_annual = Number(ProjectedMonthlyRevenue) - Number(totalExpenses);
    let net_operating_income_monthly = Number(net_operating_income_annual) / 12;
    let leveraged_net_cash_flow_annual = Number(net_operating_income_annual) - Number(mortgagePayment);
    let leveraged_net_cash_flow_monthly = Number(leveraged_net_cash_flow_annual) / 12;

    // set the values
    setNetOperatingIncomeMonthly?.(net_operating_income_monthly);
    setNetOperatingIncomeAnnual?.(net_operating_income_annual);
    setLeveragedNetCashFlowMonthly?.(leveraged_net_cash_flow_monthly);
    setLeveragedNetCashFlowAnnual?.(leveraged_net_cash_flow_annual);
  }, [monthlyRevenue, totalExpenses, mortgagePayment, ProjectedMonthlyRevenue, setNetOperatingIncomeMonthly, setNetOperatingIncomeAnnual, setLeveragedNetCashFlowMonthly, setLeveragedNetCashFlowAnnual]);

  return (
    <div className="mt-4 mx-4">
      <div className="flex flex-col sm:flex-row py-2 justify-between items-center">
        <span className="text-lg font-bold text-purple-900">
          Total Cash Invested
        </span>
        <span className="text-lg font-bold text-black">
          £{totalInvestment?.toLocaleString('en-GB')}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row py-2 justify-between items-center mt-2 my-4">
        <span className="text-lg font-bold text-purple-900">
          Net Operating Income
        </span>
        <span className="text-lg font-bold text-black">
          £{netOperatingIncomeAnnual?.toLocaleString('en-GB')}/yr &#x2022; £{netOperatingIncomeMonthly?.toLocaleString('en-GB')}/mo
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <span className="text-lg font-bold text-purple-900">
          Leveraged Net Cash Flow
        </span>
        <span className="text-lg font-bold text-black">
          £{leveragedNetCashFlowAnnual?.toLocaleString('en-GB')}/yr &#x2022; £{leveragedNetCashFlowMonthly?.toLocaleString('en-GB')}/mo
        </span>
      </div>
    </div>
  );
}
