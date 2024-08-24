'use client';
import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { DecisionDaysChart } from './Charts/DecisionDaysChart';
import { DevelopmentChart } from './Charts/DevelopmentChart';
import { EthnicGroupChart } from './Charts/EthnicGroupChart';
import { TimelineChart } from './Charts/TimelineChart';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const components = [
    <DecisionDaysChart key={0} />,
    <DevelopmentChart key={1} />,
    <EthnicGroupChart key={2} />,
    <TimelineChart key={3} />,
  ];


  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? components.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === components.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="py-7 text-foreground relative h-full w-full overflow-hidden flex-1">
      <div className="mt-4 relative">
        <div className="w-full overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {components.map((Component, index) => (
              <div key={index} className="flex-shrink-0 w-full">
                <div className="mx-2 p-4 bg-white rounded-lg" style={{ minHeight: '150px' }}>
                  <div className="flex w-full h-full flex-row">
                    {Component}
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
  );
};

export default Carousel;
