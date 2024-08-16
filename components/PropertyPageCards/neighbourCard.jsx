'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Icon } from '@iconify/react';

export function NeighbourCard({ title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const dummyData = [
    { leftContent: "Left Content 1", rightContent: "Right Content 1" },
    { leftContent: "Left Content 2", rightContent: "Right Content 2" },
    { leftContent: "Left Content 3", rightContent: "Right Content 3" }
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dummyData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dummyData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody>
        <div className="bg-default-white border border-gray-300 p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden text-gray-800 rounded-t-lg">
          <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-lg">
            <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor">
                {/* Add your SVG icon content here */}
              </svg>
            </div>
            <span>Will I Like My Neighbors in East Simi Valley?</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-between w-full mt-4 lg:mt-0 text-center">
            <div className="flex flex-col items-center mb-2">
              <div className="text-xs md:text-sm capitalize">Your Neighbors voted for</div>
              <div className="text-lg font-medium">Trump<br /><span className="text-sm">(51%)</span></div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <div className="text-xs md:text-sm capitalize">Median Household Income</div>
              <div className="text-xl font-medium">$102K</div>
            </div>
          </div>
        </div>

        {/* Carousel Implementation */}
        <div className="py-7 text-foreground px-4 relative h-full w-full overflow-hidden flex-1">
          <div className="mt-4 relative">
            <div className="w-full overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {dummyData?.map((card, index) => (
                  <div key={index} className="flex-shrink-0 w-full">
                    <div className="mx-2 p-4 bg-white rounded-lg shadow-md" style={{ minHeight: '150px' }}>
                      <div className='flex w-full h-full flex-row'>
                        <div className='w-3/5 justify-start bg-gray-200'>
                          {card.leftContent}
                        </div>
                        <div className='w-2/5 justify-end bg-gray-300'>
                          {card.rightContent}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute inset-y-1/2 flex w-full justify-between px-2">
              <Button
                isIconOnly
                variant="ghost"
                radius="full"
                size="sm"
                onClick={handlePrevious}
              >
                <Icon color="gray" icon="bx:bx-chevron-left" width={24} height={24} />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                isIconOnly
                variant="ghost"
                radius="full"
                size="sm"
                onClick={handleNext}
              >
                <Icon color="gray" icon="bx:bx-chevron-right" width={24} height={24} />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
