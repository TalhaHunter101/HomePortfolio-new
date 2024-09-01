export default function FinancialSummary({
  totalInvestment,
  monthlyRevenue,
  annualRevenue,
  ltv,
  loanAmount,
  mortgageRate,
  expenses
}) {
  // Calculate additional financial metrics
  const upfrontEquity = totalInvestment - loanAmount;
  const netOperatingIncome = annualRevenue - (expenses * 12);
  const leveragedNetCashFlow = netOperatingIncome - (loanAmount * (mortgageRate / 100));

  return (
    <div className="mt-4 mx-4">
      <div className="flex py-2 justify-between items-center">
        <span className="text-lg font-bold text-purple-900">
          Upfront Equity
        </span>
        <span className="text-lg font-bold text-black">
          £{upfrontEquity.toLocaleString('en-GB')}
        </span>
      </div>
      <div className="flex py-2 justify-between items-center mt-2 my-4">
        <span className="text-lg font-bold text-purple-900">
          Net Operating Income
        </span>
        <span className="text-lg font-bold text-black">
          £{netOperatingIncome.toLocaleString('en-GB')}/yr &#x2022; £{(netOperatingIncome / 12).toLocaleString('en-GB')}/mo
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-purple-900">
          Leveraged Net Cash Flow
        </span>
        <span className="text-lg font-bold text-black">
          £{leveragedNetCashFlow.toLocaleString('en-GB')}/yr &#x2022; £{(leveragedNetCashFlow / 12).toLocaleString('en-GB')}/mo
        </span>
      </div>
    </div>
  );
}
