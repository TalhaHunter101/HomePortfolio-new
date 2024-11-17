import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const AnalysisTable = () => {
  const tableData = [
    {
      year: 'Year 1',
      annualIncome: '£0.00',
      totalExpenses: '£20,645.00',
      operatingExpenses: '£20,645.00',
      mortgagePayment: '£14,785.57',
      totalCashflow: '-£20,645.00',
      cashROI: '-376.80%',
      propertyValue: '£137.76',
      equity: '£123,213.00',
    },
    {
      year: 'Year 2',
      annualIncome: '£0.00',
      totalExpenses: '£20,645.00',
      operatingExpenses: '£20,645.00',
      mortgagePayment: '£14,785.57',
      totalCashflow: '-£20,645.00',
      cashROI: '-376.80%',
      propertyValue: '£137.76',
      equity: '£123,213.00',
    },
  ];

  const columns = [
    { key: "year", label: "Year" },
    { key: "annualIncome", label: "Total Annual Income" },
    { key: "totalExpenses", label: "Total Expenses" },
    { key: "operatingExpenses", label: "Operating Expenses" },
    { key: "mortgagePayment", label: "Mortgage Payment" },
    { key: "totalCashflow", label: "Total Annual Cashflow" },
    { key: "cashROI", label: "Cash on Cash ROI" },
    { key: "propertyValue", label: "Property Value" },
    { key: "equity", label: "Equity" }
  ];

  return (
    <div className="mt-8 ">
      <h2 className="text-lg font-semibold mb-4">Analysis Over Time</h2>
      <Table 
        aria-label="Analysis over time table"
        classNames={{
          wrapper: "min-h-[400px]",
        }}
        className='overflow-x-auto'
        removeWrapper
        selectionMode="none"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn 
              key={column.key}
              className="bg-default-100 text-sm"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={tableData}>
          {(item) => (
            <TableRow key={item.year}>
              {(columnKey) => (
                <TableCell>{item[columnKey]}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnalysisTable;