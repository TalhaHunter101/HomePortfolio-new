'use client';
import React from 'react';
import { Card, Text } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export const BadgeCard = ({ reportData }) => {
  const crimeCountsByMonth = reportData.reduce((acc, report) => {
    const month = report._source.Month;
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += 1;
    return acc;
  }, {});

  const sortedMonths = Object.keys(crimeCountsByMonth).sort((a, b) => new Date(a) - new Date(b));
  const lastThreeMonths = sortedMonths.slice(-3);
  const [firstMonthCount, secondMonthCount, thirdMonthCount] = lastThreeMonths.map(month => crimeCountsByMonth[month]);

  const percentageChange = ((firstMonthCount - thirdMonthCount) / firstMonthCount) * 100;
  const formattedPercentageChange = percentageChange.toFixed(1); // Limit to one decimal place
  const isDecrease = percentageChange > 0;

  return (
    <Card className="p-4 w-full shadow-none rounded-lg flex flex-col items-center justify-center text-center  border-none" >
      <div className="relative flex mt-16 justify-center items-center mb-10">
        <Icon icon="mdi:shield-star" width={100} height={100} color="#40c4b5" />
        <Icon icon="mdi:star-four-points" className="absolute top-0 left-1/4" width={12} height={12} color="#b2ece1" />
        <Icon icon="mdi:star-four-points" className="absolute bottom-0 right-1/4" width={16} height={16} color="#b2ece1" />
      </div>
      <p className="mb-2 pb-2 text-xl font-bold" size={14} color="#4a4a4a">
        <Icon className='inline' icon={isDecrease ? "mdi:trending-down" : "mdi:trending-up"} width={16} height={16} color="#4a4a4a" /> 
        Crime <span style={{ color: isDecrease ? '#40c4b5' : 'red' }}>{isDecrease ? 'decreased' : 'increased'}</span> by 
        <span style={{ color: '#40c4b5' }}> {Math.abs(formattedPercentageChange)}%</span> during the last 3 months
      </p>
    </Card>
  );
};
