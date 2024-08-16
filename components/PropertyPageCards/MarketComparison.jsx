'use client';
import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Icon } from "@iconify/react";

export function MarketComparisonCard({ title, price, roi, cards }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <Card className="m-4" style={{ minHeight: '150px' }}>
            <CardHeader>
                <h2 className="text-xl font-bold">{title}</h2>
            </CardHeader>
            <CardBody>
                <div className=" bg-default border border-subtle-border p-4 sm:p-4 sm:py-6 lg:flex relative cursor-pointer overflow-hidden data-report-preview scroll-m-6 lg:scroll-m-8 bg-background text-foreground rounded-t-lg">
                    <h2 className="w-full pr-10 lg:pr-4 relative z-10 lg:w-1/2 mb-3 lg:mb-0 flex items-start space-x-2 sm:space-x-4 font-semibold capitalize space-x-2 text-foreground mb-2 sm:mb-4 text-lg">
                        <div slot="before" className="h-6 w-6 lg:w-8 lg:h-8 flex justify-center items-center mr-1 rounded-full bg-purple-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" stroke="currentColor" strokeWidth="0" className="inline-block text-sm md:text-md w-6 lg:w-8 text-foreground">
                                <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32zm96 64H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm160 96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                            </svg>
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
                <div className="mt-4 relative">
                    <div className="w-full overflow-hidden rounded-lg">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {cards?.map((card, index) => (
                                <div key={index} className="flex-shrink-0 w-full">
                                    <Card className="mx-2" style={{ minHeight: '150px' }}>
                                        <CardHeader>
                                            <h3 className="text-lg font-bold">{card.title}</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <p>Price: {card.price}</p>
                                            <p>ROI: {card.roi}</p>
                                        </CardBody>
                                    </Card>
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
            </CardBody>
        </Card>
    );
}
