'use client';
import React from 'react';
import { Card, Text } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export const CrimeReportCard = ({ reportData }) => {
  // Calculate the crime data dynamically
  const crimeDataMap = reportData.reduce((acc, report) => {
    const crimeType = report._source["Crime type"];
    if (!acc[crimeType]) {
      acc[crimeType] = { count: 0, trend: 'stable' }; // Assuming stable as default trend
    }
    acc[crimeType].count += 1;
    return acc;
  }, {});

  const crimeData = Object.keys(crimeDataMap).map(crimeType => ({
    type: crimeType,
    count: crimeDataMap[crimeType].count,
    trend: crimeDataMap[crimeType].trend // This will need real data to set trend
  }));

  // Find the latest month in the data
  const latestMonth = reportData.reduce((latest, report) => {
    const currentMonth = report._source.Month;
    return new Date(currentMonth) > new Date(latest) ? currentMonth : latest;
  }, reportData[0]._source.Month);

  // Format the latest month as "MMM YYYY"
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [year, month] = latestMonth.split("-");
  const formattedLatestMonth = `${monthNames[parseInt(month) - 1]} ${year}`;

  return (
    <div className="w-full h-350 p-5 bg-white rounded-lg">
      <div className='p-10'>
        <div className="shadow-md p-4 rounded-md bg-gray-100 mb-4">
          <h1 className="mb-0">Top Reported Crimes</h1>
          <h1 className="text-sm text-gray-500">Crime for latest month ({formattedLatestMonth})</h1>
        </div>
        <div className="space-y-2">
          {crimeData.map((crime, index) => (
            <div key={index} className="flex justify-between items-center">
              <h1>{crime.type}</h1>
              <div className="flex items-center">
                <h1>{crime.count}</h1>
                {crime.trend === 'up' ? (
                  <Icon icon="mdi:arrow-up-bold" color="red" className="ml-2" />
                ) : crime.trend === 'down' ? (
                  <Icon icon="mdi:arrow-down-bold" color="green" className="ml-2" />
                ) : (
                  <Icon icon="mdi:minus" color="grey" className="ml-2" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h1 className="text-primary cursor-pointer flex items-center">
            <Icon icon="mdi:chevron-down" width={16} className="mr-1" />
            Show More
          </h1>
        </div>
      </div>
    </div>
  );
};
