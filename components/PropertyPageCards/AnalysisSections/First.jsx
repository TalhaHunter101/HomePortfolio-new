'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Sample data based on the provided monthly expense breakdown
const expenseData = [
  { name: 'Mortgage', value: 429, color: '#4285F4' },
  { name: 'Taxes', value: 83, color: '#34A853' },
  { name: 'Insurance', value: 8, color: '#FBBC05' },
  { name: 'Variable Expenses', value: 110, color: '#EA4335' },
];

// Fixed and variable expenses details
const fixedExpenses = [
  { name: 'Electricity', value: 0 },
  { name: 'Gas', value: 0 },
  { name: 'Water & Sewer', value: 0 },
  { name: 'HOA Fees', value: 0 },
  { name: 'Garbage', value: 0 },
  { name: 'Other', value: 0 },
];

const variableExpenses = [
  { name: 'Vacancy', value: 0 },
  { name: 'Maintenance', value: 0 },
  { name: 'CapEx', value: 0 },
  { name: 'Management Fees', value: 110 },
];

const FirstSection = () => {
  return (
    <div className="flex w-full">
      {/* Pie Chart Section - Left */}
      <div className="flex-shrink-0 mr-8">
        <PieChart width={250} height={250}>
          <Pie
            data={expenseData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            label
          >
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Expense Details Section - Right */}
      <div className="flex-grow">
        <div className="font-semibold text-lg mb-4">Total Expenses: $630</div>
        <div className="grid grid-cols-3 gap-8 text-sm">
          {/* Main Expenses Column */}
          <div>
            <div className="font-semibold mb-2">Expense Type</div>
            {expenseData.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name}
                </div>
                <div className="text-right">${item.value}</div>
              </div>
            ))}
          </div>

          {/* Fixed Expenses Column */}
          <div>
            <div className="font-semibold mb-2">Fixed Expenses</div>
            {fixedExpenses.map((expense, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div>{expense.name}</div>
                <div className="text-right">${expense.value}</div>
              </div>
            ))}
          </div>

          {/* Variable Expenses Column */}
          {/* <div>
            <div className="font-semibold mb-2">Variable Expenses</div>
            {variableExpenses.map((expense, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div>{expense.name}</div>
                <div className="text-right">${expense.value}</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
