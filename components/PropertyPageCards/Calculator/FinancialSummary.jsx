export default function FinancialSummary() {
    return (
      <div className="mt-4  mx-4">
        <div className="flex py-2 justify-between items-center">
          <span className="text-lg  font-bold text-purple-900">
            Upfront Equity
          </span>
          <span className="text-lg font-bold text-black">$664,612</span>
        </div>
        <div className="flex py-2 justify-between items-center mt-2 my-4">
          <span className="text-lg font-bold text-purple-900">
            Net Operating Income
          </span>
          <span className="text-lg font-bold text-black">
            $379,637/yr &#x2022; $31,636/mo
          </span>
        </div>
        <div className="flex  justify-between items-center mb-4">
          <span className="text-lg font-bold text-purple-900">
            Leveraged Net Cash Flow
          </span>
          <span className="text-lg font-bold text-black">
            $196,221/yr &#x2022; $16,352/mo
          </span>
        </div>
      </div>
    );
  }
  