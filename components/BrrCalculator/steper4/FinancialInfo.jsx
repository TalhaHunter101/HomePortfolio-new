import React from 'react';

const FinancialInfo = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold">Financial Info</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        <div className="text-center">
          <p className="text-2xl font-bold">10.49%</p>
          <p className="text-gray-500">2% RULE</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">£123.00</p>
          <p className="text-gray-500">TOTAL INITIAL EQUITY</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">2.00%</p>
          <p className="text-gray-500">TYPICAL CAP RATE</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">0.79</p>
          <p className="text-gray-500">GROSS RENT MULTIPLIER</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">0.00 / -1.09</p>
          <p className="text-gray-500">DEBT COVERAGE RATIO</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-red-500 text-xl font-bold">-£809,494.00</p>
        <p className="text-gray-500">ARV</p>
      </div>
      <div className="mt-6 text-center">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600">
          Refinance your mortgage
        </button>
      </div>
    </div>
  );
};

export default FinancialInfo;
