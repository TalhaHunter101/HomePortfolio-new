'use client';
import React from 'react';
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { DreamHouseLineChart } from './Charts/LineChartDreamHouse';
import {FilterButton} from './DreamhouseComponents/Filter';
import { DropdownButton } from './DreamhouseComponents/DateFilter';


export function DreamHouseCard({ title, price, roi }) {
  return (
    <Card className="m-4" style={{ minHeight: '400px', minWidth: '800px' }}>
     
      <CardHeader>
        <div className="flex w-full justify-between items-center">
          {/* Title and subtitle on the left */}
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <span className="text-sm text-default-500" >Gain insight into current & past market trends</span>
          </div>

          {/* Buttons on the right */}
          <div className="flex mt-5  justify-end gap-2">
            <FilterButton />
            <DropdownButton />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="p-2 border  border-subtle-border rounded-md">
          <span className='text-sm'>
            Last month on average, Single Family homes sold for{' '}
            <span className="font-medium inline-block text-base text-green-600">
              $207K
            </span>{' '}
            more than Condos.
          </span>
          <span className="block text-sm ">
            Last month, sale price of Single Family homes decreased by{' '}
            <span className="font-medium inline-block text-base text-red-600">
              4.7%
            </span>{' '}
            whereas sale price of Condos decreased by{' '}
            <span className="font-medium inline-block text-base text-red-600">
              1.6%
            </span>
            , in comparison to its previous month.
          </span>

          <div className="flex justify-between flex-col lg:flex-row gap-8 mt-4">
            <div className="lg:w-7/12">
              <DreamHouseLineChart />
            </div>

            <div className="lg:w-5/12 py-3">
              <div className="grid gap-y-4">
                {/* Single Family Section */}
                <div className="grid gap-y-1">
                  <div className="font-medium text-purple-500">Single Family</div>
                  
                  <ul className="grid gap-2 list-disc pt-2 pl-6">
                    <li>
                      Median Sale Price (last month):{' '}
                      <span className="font-medium inline-block text-base text-purple-500">
                        $590K
                      </span>
                    </li>
                    <li>
                      Sale price range:{' '}
                      <span className="font-medium inline-block text-base text-purple-500">
                        $513K
                      </span>{' '}
                      to{' '}
                      <span className="font-medium inline-block text-base text-purple-500">
                        $619K
                      </span>
                    </li>
                    <li>
                      Sale price{' '}
                      <span className="text-sm">(% change in 12 months)</span>:{' '}
                      <span className="font-medium inline-block text-base text-green-600">
                        ↑1.61%
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Condos Section */}
                <div className="grid gap-y-1">
                  <div className="font-medium text-blue-600">Condos</div>
                  
                  <ul className="grid gap-2 list-disc pt-2 pl-6">
                    <li>
                      Median Sale Price (last month):{' '}
                      <span className="font-medium inline-block text-base text-blue-600">
                        $383K
                      </span>
                    </li>
                    <li>
                      Sale price range:{' '}
                      <span className="font-medium inline-block text-base text-blue-600">
                        $375K
                      </span>{' '}
                      to{' '}
                      <span className="font-medium inline-block text-base text-blue-600">
                        $445K
                      </span>
                    </li>
                    <li>
                      Sale price{' '}
                      <span className="text-sm">(% change in 12 months)</span>:{' '}
                      <span className="font-medium inline-block text-base text-green-600">
                        ↑0.8%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
