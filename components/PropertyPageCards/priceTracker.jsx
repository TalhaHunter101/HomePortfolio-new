'use client';
import React from 'react';
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { PricetrackerChart } from './Charts/pricetrckerChart';

export function PriceTrackerCard({ title, }) {
    return (
        <Card className="m-4" style={{ minHeight: '150px' }}>
            <CardHeader>
                <h2 className="text-xl font-bold">{title}</h2>
            </CardHeader>

            <CardBody>
                <section
                    id="price-tracker"
                    className="max-w-1/2 p-4 w-full font-medium border border-gray-200bg-default-white rounded-lg mx-auto max-w-screen-md lg:max-w-screen-lg"
                >
                    <div className="flex flex-col md:flex-row">
                        <h2 className="text-xl md:w-2/5 text-foreground">
                            Home prices in <span className="text-primary">East Simi Valley</span> have grown faster than overall home prices in Simi Valley over the last 3 years
                        </h2>
                        <div className="md:w-3/5 flex flex-col md:flex-col-reverse md:pl-4">
                            <div className="w-full mt-6 sm:mt-5 text-foreground" style={{ minHeight: '215px' }}>
                                <div style={{ minHeight: '215px' }}>
                                    {/* ApexChart placeholder */}
                                    <div className="apexcharts-canvas">
                                        
                                               <PricetrackerChart/>

                                        
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between font-light text-foreground">
                                <div>
                                    <div className="text-sm">East Simi Valley growth Rate</div>
                                    <div className="text-[16px] text-primary">
                                        <b className="font-medium text-[22px]">6%</b> per year
                                    </div>
                                </div>
                                <div className="text-foreground">
                                    <div className="text-sm">Simi Valley growth Rate</div>
                                    <div className="text-[16px]">
                                        <b className="font-medium text-[22px]">5.3%</b> per year
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </CardBody>
        </Card>
    );
}
