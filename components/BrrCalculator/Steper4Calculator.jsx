import React from 'react'
import PieChartComponent from './chart/PieChartComponent'
import FinancialInfo from './steper4/FinancialInfo'
import AnalysisTable from './steper4/AnalysisTable'
import Charts from './steper4/Charts'
import { Button } from '@nextui-org/react'

function Steper4Calculator() {
  return (
    <div className="md:mx-24 p-6 bg-gray-100">
      <div className="text-blue-600 text-lg font-semibold">
        fgcsv sldscsjd, rr, aa 12982
      </div>
      <div className="text-gray-500">MLS number: 345678. ghsvhx sus hdshu x</div>

      <div className="flex flex-wrap space-y-4 md:space-y-0 items-center space-x-4 mt-4">
        <Button className="bg-blue-600 text-white px-4 py-2 rounded">Download PDF</Button>
        <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Edit Report</Button>
        <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Discuss in Forums</Button>
        <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Start a new report</Button>
        <Button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Other actions</Button>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-xl font-bold">£5,467</div>
            <div className="text-gray-500">PURCHASE PRICE</div>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Purchase Closing Costs: £12.00</li>
              <li>Estimated Repairs: £0.00</li>
              <li>Total Project Cost: £5,479.00</li>
              <li>After Repair Value: £123.00</li>
            </ul>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Acquisition</div>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Down Payment: £5,467.00</li>
              <li>Loan Amount: £0.00</li>
              <li>Loan Points/Fees: £0.00</li>
              <li>Amortized Over: 12 years</li>
              <li>Loan Interest Rate: 2.000%</li>
              <li>Monthly P&I: £0.00</li>
              <li>Total Cash Needed At Purchase: £5,479.00</li>
            </ul>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Refinance</div>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li>Loan Amount: £123,213.00</li>
              <li>Loan Fees: £0.00</li>
              <li>Amortized Over: 123 years</li>
              <li>Loan Interest Rate: 12.000%</li>
              <li>Monthly P&I: £1,232.13</li>
              <li>Total Cash Invested: £0.00</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold">Rehab Period</div>
            <div className="text-sm text-gray-600">Initial Rental Period</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">£3,156.29</div>
            <div className="text-sm text-gray-500">MONTHLY EXPENSES</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div>
            <div className="text-gray-500">Total Operating Expenses:</div>
            <div className="text-gray-800 font-semibold">£1,924.16</div>
          </div>
          <div>
            <PieChartComponent />
          </div>
        </div>
      </div>

      <FinancialInfo />
      <AnalysisTable />
      <Charts />
    </div>
  )
}

export default Steper4Calculator