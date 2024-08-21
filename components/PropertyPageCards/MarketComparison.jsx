'use client';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { ScatterChartComponent } from './Charts/MarketScatterChart';
import ComparisonChart from './Charts/ComparisonChart';




const getItemsData = () => [
    { name: "Rocky Pointe Natural Park", category: "Parks • Kuehner Dr", distance: "0.2 miles away" },
    { name: "Sunset Valley Trail", category: "Trails • Oak St", distance: "0.5 miles away" },
    { name: "Lakeview Park", category: "Parks • Lakeview Rd", distance: "1.0 miles away" },
    { name: "Hickory Creek Park", category: "Parks • Hickory Creek Rd", distance: "2.0 miles away" },
    // Add more items as needed
];
export function MarketComparisonCard({ title, price, roi, cards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const items = getItemsData();

    const nextSlide = () => {
        if (currentIndex < items.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    return (
        <Card className="m-4" style={{ minHeight: '150px', maxWidth: '1050px' }}>
            <CardHeader>
                <h2 className="text-xl font-bold">{title}</h2>
            </CardHeader>
            <CardBody>
                <div className=' rounded-md border border-subtle-border'>
                <div className=" bg-default-white p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden data-report-preview scroll-m-6 lg:scroll-m-8 bg-background text-foreground rounded-t-lg">
                    <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize space-x-2 text-foreground mb-2 sm:mb-4 text-lg">
                        <div slot="before" className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-green-500">
                            <Icon icon="mdi:scale-balance" />
                        </div>
                        <span>Market Comparison</span>
                    </h2>
                    <div className="sentences leading-6 w-full lg:w-1/2 pr-2 sm:pr-10 relative z-10 max-w-md text-foreground">
                        <p>
                            There arent too many bidding wars right now in 93063,
                            with homes selling at asking price over the last three months.
                        </p>
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="z-10 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
                    <div className="hidden xl:flex h-96">
                        <div className="flex relative overflow-hidden sm:mx-4  ">
                            {/* Map section on the left */}
                            <div className="flex-1 z-40 h-full">
                                <div className="h-full ">
                                    <div className=" h-full bg-white ">
                                        <div>
                                        <ComparisonChart />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel section on the right */}
                            <div className="flex-1 w-1/2  flex flex-col justify-center h-full">
                                <div className="relative w-full h-full flex items-center">
                                    <button
                                        onClick={prevSlide}
                                        disabled={currentIndex === 0}
                                        className="absolute left-0 z-10 p-2 bg-white bg-opacity-50 rounded-full"
                                    >
                                        &#10094;
                                    </button>
                                    <div
                                        className="flex transition-transform duration-500 ease-in-out w-full"
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {items.map((item, index) => (
                                            <div key={index} className="flex-shrink-0 w-[100%] h-full p-2">
                                                <Card className="w-full h-full"
                                                shadow='sm'>
                                                    
                                                   
                                                    <CardBody className="p-4 flex flex-col justify-between">
                                                     <ScatterChartComponent />
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={nextSlide}
                                        disabled={currentIndex === items.length - 1}
                                        className="absolute right-0 z-10 p-2 bg-white bg-opacity-50 rounded-full"
                                    >
                                        &#10095;
                                    </button>
                                </div>


                            </div>
                            {/* End of carousel integration */}
                        </div>
                    </div>
                </div>
                </div>
            </CardBody>
        </Card>
    );
}
