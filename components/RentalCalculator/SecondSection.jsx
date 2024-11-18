'use client';
import React from 'react';
import { Slider, Button } from '@nextui-org/react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const SecondSection = () => {
  // Data for Pie Charts
  const rentalIncomeData = [{ name: 'Rental Income', value: 2200, color: '#34A853' }];
  const expensesData = [{ name: 'Expenses', value: 630, color: '#FFBF00' }];
  const loanDetailsData = [{ name: 'Total Cash Needed', value: 25000, color: '#4285F4' }];

  return (
    <div className="flex flex-col w-full mt-8">
      {/* Top Section - Rental Income, Expenses, Loan Details */}
      <div className="flex w-full justify-between mb-8 space-x-4">
        
        {/* Rental Income Section */}
        <div className="flex flex-col items-center w-1/3 px-4">
          <div className="font-bold text-xl text-gray-700 mb-2">Rental income</div>
          <PieChart width={100} height={100}>
            <Pie
              data={rentalIncomeData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={40}
              fill="#34A853"
            >
              {rentalIncomeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="text-2xl text-gray-700 font-bold mt-2">$2,200</div>
          
          {/* Slider for Rental Income */}
          <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Rental income</span>
              <span className="text-blue-500">$2,200/month</span>
            </div>
            <Slider
              label="Rental income"
              step={50}
              maxValue={5000}
              minValue={500}
              defaultValue={2200}
              size="sm"
            />
          </div>
          <div className="flex justify-center mt-8">
        <Button color="primary" size='sm' variant='ghost'>
          Edit details
        </Button>
      </div>
        </div>

        {/* Expenses Section */}
        <div className="flex flex-col items-center w-1/3 px-4">
          <div className="font-bold text-gray-700 text-xl mb-2">Expenses</div>
          <PieChart width={100} height={100}>
            <Pie
              data={expensesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={40}
              fill="#FFBF00"
            >
              {expensesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="text-2xl text-gray-700 font-bold mt-2">$630</div>

          {/* Slider for Custom Expenses */}
          <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Custom expenses</span>
              <span className="text-blue-500">$0/month</span>
            </div>
            <Slider
              label="Custom expenses"
              step={10}
              maxValue={1000}
              minValue={0}
              defaultValue={0}
              size="sm"
            />
          </div>

          {/* Slider for Vacancy */}
          <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Vacancy</span>
              <span className="text-blue-500">0%</span>
            </div>
            <Slider
              label="Vacancy"
              step={1}
              maxValue={20}
              minValue={0}
              defaultValue={0}
              size="sm"
            />
          </div>
          <div className="flex justify-center mt-8">
        <Button variant='ghost' color="primary" size='sm'>
          Edit details
        </Button>
      </div>
        </div>

        {/* Loan Details Section */}
        <div className="flex flex-col items-center w-1/3 px-4">
          <div className="font-bold text-gray-700 text-xl mb-2">Loan details</div>
          {/* <PieChart width={100} height={100}>
            <Pie
              data={loanDetailsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={40}
              fill="#4285F4"
            >
              {loanDetailsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart> */}
          <div>Total cash needed</div>
          <div className="text-2xl text-gray-700 font-bold ">$25,000</div>

          {/* Slider for Purchase Price */}
          <div className="w-full mt-24">
            <div className="flex justify-between items-center mb-2">
              <span>Purchase price</span>
              <span className="text-blue-500">$100,000</span>
            </div>
            <Slider
              label="Purchase price"
              step={5000}
              maxValue={500000}
              minValue={50000}
              defaultValue={100000}
              size="sm"
            />
            
          </div>

          {/* Slider for Loan Amount */}
          <div className="w-full mt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Loan amount</span>
              <span className="text-blue-500">$80,000</span>
            </div>
            <Slider
              label="Loan amount"
              step={1000}
              maxValue={400000}
              minValue={50000}
              defaultValue={80000}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Edit Details Button */}
     
    </div>
  );
};

export default SecondSection;
