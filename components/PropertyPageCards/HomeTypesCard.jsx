'use client';
import React from 'react';
import { Card, CardBody, CardHeader,  } from "@nextui-org/react";
import { DistributionPieChart } from './Charts/DistributionPieChart';
import { ScatterChartComponent } from './Charts/MarketScatterChart';
import { DistributionBarChart } from './Charts/DistributionBarChart';

export function HomeTypesCard  ({title, })  {
  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader className='flex flex-col items-start '>
        <h2 className="text-xl font-bold">{title}</h2><br />
        <h4 className='p-0'>Homes available for sale by home type, beds & price range
        </h4>
      </CardHeader>
      <CardBody>
      <div className="h-full border border-subtle-border rounded-md p-4">
      <div className="flex flex-col justify-between gap-y-4 h-full layout-single md:fullbleed">
        {/* Home Types Distribution Section */}
        <div className="flex flex-row flex-wrap gap-8">
          <div className="flex flex-col gap-y-2 flex-1 basis-96">
            <div className="text-xl font-semibold">Home Types Distribution</div>
            
            <div className="grid relative md:pt-12/16 pt-15/16">
              <div className="block lg:hidden absolute top-0 right-0 text-sm">
                <ul>
                  <li className="text-zdsecondary-1000">Houses</li>
                  <li className="text-zdsecondary-400">3297 homes</li>
                </ul>
              </div>
              
              <div className="grid relative md:pt-12/16 pt-15/16">
                
                <DistributionPieChart />
              </div>
            </div>
          </div>

          {/* Home Price Distribution Section */}
          <div className="flex  flex-col gap-y-2 flex-1 basis-80">
            <div className="text-xl font-semibold">Home Price Distribution</div>
            
            <div className="flex justify-between">
              <div className="flex flex-col items-start">
                <div className="  lg:mb-1">Min</div>
                <div className="text-lime-500">
                  <span className="text-4xl text-2xl lg:text-3xl">$138K</span>
                </div>
              </div>
              <div className="justify-self-end">
                <div className="flex flex-col items-start">
                  <div className="  lg:mb-1">Median</div>
                  <div className="text-amber-500">
                    <span className="text-4xl text-2xl lg:text-3xl">$655K</span>
                  </div>
                </div>
              </div>
              <div className="justify-self-end">
                <div className="flex flex-col items-start">
                  <div className="text-zdsecondary-600 dark:text-zdsecondary-300 lg:mb-1">Max</div>
                  <div className="text-red-500">
                    <span className="text-4xl text-2xl lg:text-3xl">$25.5M</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="self-center  pt-4 text-sm lg:text-base text-zd-600">Houses</span>
            <div className="relative flex-1 font-mono pt-9/16" style={{ width: '100%' }}>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <DistributionBarChart/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </CardBody>
    </Card>
  );
};


