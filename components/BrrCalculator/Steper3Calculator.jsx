import { Button, Input, Spacer } from '@nextui-org/react';
import React from 'react'

function Steper3Calculator() {
  return (
    <div className="mx-24 p-8 bg-white shadow-md rounded-md ">
      <h2 className="text-2xl font-semibold mb-6">Income</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input fullWidth label="Total Gross Monthly Rent" placeholder="£" />
          <span className="text-sm text-blue-500 cursor-pointer">Enter the total value or provide a unit breakdown.</span>
        </div>
        <div>
          <Input fullWidth readOnly label="Total Monthly Income" initialValue="£0" />
        </div>
      </div>
      <Spacer y={1} />
      <div>
        <Input fullWidth label="Other Monthly Income" placeholder="£" />
        <span className="text-sm text-blue-500 cursor-pointer">Enter the total value or provide an individual breakdown.</span>
      </div>
      <Spacer y={2} />
      <h2 className="text-2xl font-semibold mb-6">Fixed Landlord-Paid Expenses</h2>
      <div className="grid grid-cols-2 gap-4">
        {['Electricity', 'Water & Sewer', 'PMI', 'Garbage', 'HOAs', 'Monthly Insurance', 'Property Taxes', 'Other Monthly Expenses'].map((label) => (
          <div key={label}>
            <Input  fullWidth  label={label} placeholder="£" />
          </div>
        ))}
      </div>
      <Spacer y={2} />
      <h2 className="text-2xl font-semibold mb-6">Variable Landlord-Paid Expenses</h2>
      <div className="grid grid-cols-2 gap-4">
        {['Vacancy (%)', 'Repairs and Maintenance (%)', 'Capital Expenditures (%)', 'Management Fees (%)'].map((label) => (
          <div key={label}>
            <Input fullWidth label={label} placeholder="%" />
          </div>
        ))}
      </div>
      <Spacer y={2} />
      <h2 className="text-2xl font-semibold mb-6">Future Assumptions</h2>
      <div className="grid grid-cols-2 gap-4">
        {['Annual Income Growth (%)', 'Annual PV Growth (%)', 'Annual Expenses Growth (%)', 'Sales Expenses (%)'].map((label) => (
          <div key={label}>
            <Input fullWidth label={label} placeholder="%" />
          </div>
        ))}
      </div>
      <Spacer y={2} />
      <div className='flex justify-between space-x-10'>

      <Button className="mt-4 w-full" color="primary">Previous</Button>
      <Button className="mt-4 w-full" color="primary">Calculate Results</Button>
      </div>
    </div>
  );
}

export default Steper3Calculator