'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const data = [
    {year:'-', propertyValue: 0, equity: 0, loanBalance: 0, cashFlow: 0, profitIfSold: 0, annualReturn: 0},
  { year: 'Year 1', propertyValue: 102000, equity: 23000, loanBalance: 78819, cashFlow: 19314, profitIfSold: 10000, annualReturn: 52.02 },
  { year: 'Year 2', propertyValue: 104000, equity: 26000, loanBalance: 77579, cashFlow: 19803, profitIfSold: 33000, annualReturn: 48.16 },
  { year: 'Year 3', propertyValue: 106000, equity: 30000, loanBalance: 76274, cashFlow: 20302, profitIfSold: 56000, annualReturn: 43.31 },
  { year: 'Year 5', propertyValue: 110000, equity: 37000, loanBalance: 73462, cashFlow: 21331, profitIfSold: 105000, annualReturn: 39.11 },
  { year: 'Year 10', propertyValue: 122000, equity: 57000, loanBalance: 65073, cashFlow: 24087, profitIfSold: 239000, annualReturn: 26.58 },
  { year: 'Year 15', propertyValue: 135000, equity: 80000, loanBalance: 54307, cashFlow: 27131, profitIfSold: 391000, annualReturn: 20.62 },
  { year: 'Year 20', propertyValue: 149000, equity: 108000, loanBalance: 40489, cashFlow: 30491, profitIfSold: 563000, annualReturn: 17.11 },
  { year: 'Year 30', propertyValue: 181000, equity: 181000, loanBalance: 0, cashFlow: 38297, profitIfSold: 981000, annualReturn: 13.11 },
];

const FourthSection = () => {
  return (
    <div className="flex flex-col w-full mt-8">
      {/* Line Chart Section */}
      <div className="w-full mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="propertyValue" stroke="#34A853" strokeWidth={2} />
            <Line type="monotone" dataKey="equity" stroke="#42A5F5" strokeWidth={2} />
            <Line type="monotone" dataKey="loanBalance" stroke="#AB47BC" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <Table className='overflow-auto' removeWrapper aria-label="Financial Summary Table">
        <TableHeader>
          <TableColumn></TableColumn>
          {data.map((item, index) => (
            <TableColumn key={index}>{item.year}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {/* Property Value */}
          <TableRow key="propertyValue">
            <TableCell className="font-semibold text-green-700">Property value</TableCell>
            {data.map((item, index) => (
              <TableCell key={index}>${(item.propertyValue / 1000).toFixed(1)}K</TableCell>
            ))}
          </TableRow>

          {/* Equity */}
          <TableRow key="equity">
            <TableCell className="font-semibold text-blue-700">Equity</TableCell>
            {data.map((item, index) => (
              <TableCell key={index}>${(item.equity / 1000).toFixed(1)}K</TableCell>
            ))}
          </TableRow>

          {/* Loan Balance */}
          <TableRow key="loanBalance">
            <TableCell className="font-semibold text-purple-700">Loan balance</TableCell>
            {data.map((item, index) => (
              <TableCell key={index}>${(item.loanBalance / 1000).toFixed(1)}K</TableCell>
            ))}
          </TableRow>

          {/* Cash Flow */}
          <TableRow key="cashFlow">
            <TableCell className="font-semibold">Cash flow</TableCell>
            {data.map((item, index) => (
              <TableCell key={index}>${(item.cashFlow / 1000).toFixed(1)}K</TableCell>
            ))}
          </TableRow>

          {/* Mortgage Payment */}
          <TableRow key="mortgagePayment">
            <TableCell className="font-semibold">Mortgage payment</TableCell>
            {data.map(() => (
              <TableCell key={Math.random()}>$429</TableCell>
            ))}
          </TableRow>

          {/* Profit if Sold */}
          <TableRow key="profitIfSold">
            <TableCell className="font-semibold">Profit if sold</TableCell>
            {data.map((item, index) => (
              <TableCell key={index}>${(item.profitIfSold / 1000).toFixed(1)}K</TableCell>
            ))}
          </TableRow>

          {/* Annualized Return */}
          <TableRow key="annualReturn">
            <TableCell className="font-semibold">Annualized return</TableCell>
            {data.map((item, index) => (
              <TableCell key={index}>{item.annualReturn ? `${item.annualReturn.toFixed(2)}%` : '--'}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FourthSection;
