'use client';
import React from 'react';
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import FirstSection from './AnalysisSections/First';
import SecondSection from './AnalysisSections/Second';
import ThirdSection from './AnalysisSections/Third';
import FourthSection from './AnalysisSections/FourthSection';
import FifthSection from './AnalysisSections/Fifth';
import { Icon } from '@iconify/react';

// Sample data based on the provided monthly expense breakdown
const expenseData = [
  { name: 'Mortgage', value: 429, color: '#4285F4' }, // Blue color
  { name: 'Taxes', value: 83, color: '#34A853' }, // Green color
  { name: 'Insurance', value: 8, color: '#FBBC05' }, // Yellow color
  { name: 'Variable Expenses', value: 110, color: '#EA4335' }, // Red color
];

// Fixed and variable expenses details
const fixedExpenses = [
  { name: 'Electricity', value: 0 },
  { name: 'Gas', value: 0 },
  { name: 'Water & Sewer', value: 0 },
  { name: 'HOA Fees', value: 0 },
  { name: 'Garbage', value: 0 },
  { name: 'Other', value: 0 }
];

const variableExpenses = [
  { name: 'Vacancy', value: 0 },
  { name: 'Maintenance', value: 0 },
  { name: 'CapEx', value: 0 },
  { name: 'Management Fees', value: 110 }
];

export function AnalysisCard({ price, roi }) {
  return (
    <Card className="m-4 overflow-hidden" style={{ minHeight: '400px' }}>
      <CardHeader>
        <div className="flex items-center my-2">
          <div className="flex items-center justify-center w-8 h-8 aspect-square bg-purple-200 rounded-full mr-2">
            <Icon
              icon="streamline:code-analysis-solid"
              width={16}
              className="text-purple-700" 
            />
          </div>
          <h2 className="text-xl font-bold text-gray-700">
          Analysis?
          </h2>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col w-full">
      
        {/* Card Header */}
       

        {/*  Container */}
        <FirstSection />
        <Divider className='my-6' />
        <SecondSection />
        {/* <ThirdSection/> */}
        {/* <Divider className='my-6' />
        <FourthSection/> */}
        <Divider className='my-6' />
        <FifthSection/>



        {/* Additional Data */}
       
      </CardBody>
    </Card>
  );
};
