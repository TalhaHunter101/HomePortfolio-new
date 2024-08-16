'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import SearchCard from '../SearchPage/SearchCrd';

const getItemsData = () => [
    { name: "Rocky Pointe Natural Park", category: "Parks • Kuehner Dr", distance: "0.2 miles away" },
    { name: "Sunset Valley Trail", category: "Trails • Oak St", distance: "0.5 miles away" },
    { name: "Lakeview Park", category: "Parks • Lakeview Rd", distance: "1.0 miles away" },
    { name: "Hickory Creek Park", category: "Parks • Hickory Creek Rd", distance: "2.0 miles away" },
    // Add more items as needed
];

export function RecentlySoldCard({ title, price, roi }) {
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
        <Card className="m-4" style={{ minHeight: '150px' }}>
            <CardHeader>
                <h2 className="text-xl font-bold">{title}</h2>
            </CardHeader>
            <CardBody>
                <div className="bg-gray-250 border border-subtle-border p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden scroll-m-6 lg:scroll-m-8 bg-background text-foreground rounded-t-lg">
                    <div className="flex items-start space-x-2 sm:space-x-4 font-semibold capitalize text-foreground mb-2 sm:mb-4 text-lg">
                        <div className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-purple-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0"
                                className="inline-block text-sm md:text-md w-6 lg:w-8 text-foreground"
                            >
                                <path d="M317.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224C.9 240.7-2.6 254.8 2 267.3S18.7 288 32 288H143.5L66.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H240.5L317.4 44.6z"></path>
                            </svg>
                        </div>
                        <span>Recently Sold Homes in East Simi Valley</span>
                    </div>
                    <div className="grid item-start sm:items-center grid-cols-2">
                        <div className="flex flex-col items-start md:items-center mb-2 pr-2 text-center justify-between">
                            <div className="text-xs md:text-sm capitalize text-foreground"># recently sold</div>
                            <div className="text-xl text-foreground font-medium">18</div>
                        </div>
                        <div className="flex flex-col items-center mb-2 pr-2 text-center justify-between">
                            <div className="text-xs md:text-sm capitalize text-foreground">Median Price in East Simi Valley</div>
                            <div className="text-xl text-muted-foreground font-medium">$796K</div>
                        </div>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0"
                        className="inline-block absolute right-4 top-4 sm:top-6 w-6 h-6 transition-transform text-foreground"
                    >
                        <path d="M169.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 205.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"></path>
                    </svg>
                </div>
                <div className="z-10 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
                    <div className="hidden xl:flex h-96">
                        <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                            {/* Map section on the left */}
                            <div className="flex-1 z-40 h-full">
                                <div className="h-full w-full">
                                    <div className="w-full h-full bg-white border-1 maplibregl-map mapboxgl-map">
                                        <div>
                                            <p>map to be integrated here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel section on the right */}
                            <div className="flex-1  flex flex-col justify-center h-full">
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
                                                    
                                                    <CardHeader className="p-0">
                                                        <Image
                                                            src="https://via.placeholder.com/150"
                                                            alt={item.name}
                                                            className="w-full h-64 object-cover rounded-t-md"
                                                        />
                                                    </CardHeader>
                                                    <CardBody className="p-4 flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="text-lg font-bold">{item.name}</h3>
                                                            <p className="text-sm">{item.category}</p>
                                                            <p className="text-sm text-gray-500">{item.distance}</p>
                                                        </div>
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
            </CardBody>
        </Card>
    );
}
