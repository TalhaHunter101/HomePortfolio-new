'use client';
import React from 'react';
import { useState } from 'react';
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import CardItem from './EVcardComponents/CarousalCards';
export const getItemsData = () => [
    {
        title1: "Ucsf Campus Acc P5 Ev2",
        address1: "400 Parnassus Ave",
        description1: "ChargePoint • 2 chargers",
        svgIcon1: "<svg>...</svg>", 

        title2: "Whole Foods Mkt 1150 Ocean 1",
        address2: "1150 Ocean Ave",
        description2: "ChargePoint • 1 charger",
        svgIcon2: "<svg>...</svg>", 
    },
    {
        title1: "Mission Bay Parking Garage",
        address1: "1625 Owens St",
        description1: "ChargePoint • 3 chargers",
        svgIcon1: "<svg>...</svg>", 

        title2: "Tesla Supercharger",
        address2: "350 3rd St",
        description2: "Tesla • 5 chargers",
        svgIcon2: "<svg>...</svg>", 
    },
    {
        title1: "Safeway Charging Station",
        address1: "1335 Webster St",
        description1: "Blink • 4 chargers",
        svgIcon1: "<svg>...</svg>", 

        title2: "Downtown SF Charging",
        address2: "450 Golden Gate Ave",
        description2: "ChargePoint • 2 chargers",
        svgIcon2: "<svg>...</svg>", 
    },
    
];
export function EVCard({ price, roi }) {
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
        <Card className="m-4" style={{ minHeight: '150px', maxWidth: '1066px' }}>
            <CardHeader>
                
            </CardHeader>
            <CardBody> <div className='border border-subtle-border rounded-md p-2  '> 

                <div className=" p-4 sm:p-4 sm:py-6 lg:flex relative  scroll-m-6 lg:scroll-m-8 bg-background text-foreground rounded-t-lg">
                    <h2 className="w-full pr-10 lg:pr-4 relative z-10 mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground mb-2 sm:mb-4 text-lg">
                        <div className="h-6 w-6 mx-2 px-2 lg:w-8 lg:h-8 flex justify-center items-center   rounded-full bg-purple-400">
                            <Icon icon="mdi:ev-station" />
                        </div>
                        <span>Where Can I Charge My Electric Vehicle near 391 30th Street?</span>
                    </h2>
                    <div className="  w-full relative pr-2 sm:pr-10 md:pr-2 z-10 max-w-md mt-4 md:mt-0 text-foreground grid item-start sm:items-center grid-cols-1">
                        <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
                            <div className="text-xs md:text-sm capitalize text-foreground">Charging stations nearby</div>
                            <div className="text-xl text-foreground font-medium">27</div>
                        </div>
                    </div>

                </div>
                <div className="pt-7 pb-8 rounded-md  xs:pb-7 text-foreground shadow relative h-full w-[100%] overflow-hidden flex-1">
                    <div className="mx-6 lg:mx-12 z-10 shadow text-gray-500 font-medium bg-purple-100 text-xs sm:text-sm p-4 rounded-lg ">
                        Charging an EV does take a bit of planning. Knowing the type of charger
                        available at a public station (Level 2 units, DC fast chargers, or
                        Superchargers), as well as the time taken to charge your vehicle can
                        help you avoid delays.
                    </div>
                    <div className="mx-6 lg:mx-12 flex mt-7 max-w-sm justify-between">
                        <div className="flex">
                            <div>
                                <div className="text-xs lg:text-sm text-gray-800">Number of Nearby Stations</div>
                                <div className="text-yellow-800 flex items-end stat-wrapper">
                                    <div className="text-2xl lg:text-3xl font-semibold">27</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div>
                                <div className="text-xs lg:text-sm text-gray-800">Free charging?</div>
                                <div className="text-yellow-800 flex items-end stat-wrapper">
                                    <div className="text-2xl lg:text-3xl font-semibold">Available</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="z-10 mt-4 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
                    <div className="hidden xl:flex h-96">
                        <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                            {/* Map section on the left */}
                            <div className="flex-1 z-40 w-1/2 h-full">
                                <div className="h-full w-full">
                                    <div className="w-full h-full bg-white border-1 maplibregl-map mapboxgl-map">
                                        <div>
                                            <p>map to be integrated here</p>
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
                                                <CardItem {...item} />
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
                            
                        </div>
                    </div>
                </div>
                </div>            
                </CardBody>
        </Card>
    );
}
