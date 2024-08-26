'use client';
import React from 'react';
import { Card, Text } from '@nextui-org/react';
import { Icon } from '@iconify/react';

 export const CrimeReportCard = () => {
  const crimeData = [
    { type: 'Violence and sexual offences', count: 19, trend: 'down' },
    { type: 'Anti-social behaviour', count: 17, trend: 'up' },
    { type: 'Other theft', count: 14, trend: 'up' },
    { type: 'Shoplifting', count: 12, trend: 'up' },
  ];

  return (
    <div className="w-full h-350 p-5 bg-white rounded-lg ">
        <div className=' p-10  '>
      <div className="mb-4">
        <h1  className="mb-0">Top Reported Crimes</h1>
        <h1 className="text-sm text-gray-500">Crime for latest month (Mar 2023)</h1>
      </div>
      <div className="space-y-2">
        {crimeData.map((crime, index) => (
          <div key={index} className="flex justify-between items-center">
            <h1>{crime.type}</h1>
            <div className="flex items-center">
              <h1>{crime.count}</h1>
              {crime.trend === 'up' ? (
                <Icon icon="mdi:arrow-up-bold" color="red" className="ml-2" />
              ) : (
                <Icon icon="mdi:arrow-down-bold" color="green" className="ml-2" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 ">
        <h1 className="text-primary cursor-pointer flex items-center">
          <Icon icon="mdi:chevron-down" width={16} className="mr-1" />
          Show More
        </h1>
      </div>
      </div>
    </div>
  );
};

 
