'use client';
import React from 'react';
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";

export function GoodTimeToBuy({  }) {
    return (
        <Card className="m-4" style={{ minHeight: '150px' }}>
            <CardHeader>
              
            </CardHeader>
            <CardBody>
                <div className="w-full bg-default-white py-6 px-4 my-2  rounded-md">
                    <p className="text-sm font-bold mb-3">Buyers Should Act Fast</p>
                    <div className="grid grid-cols-6 gap-4 my-4">
                        <div id="good-2-buy" className="col-span-6 md:col-span-3">
                            <p className="text-md flex align-center items-center h-full">
                                The number of new listings is 69 over the last 3 months. Meanwhile, home sales accrued to 41 over the last 3 months.
                            </p>
                        </div>
                        <div className="col-span-6 md:col-span-3">
                            <div className="flex gap-4 my-4 justify-between">
                                <div className="flex-1 text-center">Buyers Market</div>
                                <div className="flex-1 text-center">Sellers Market</div>
                            </div>
                            <Progress color="primary" value={90} max={100} />
                            <div className="grid grid-cols-6 gap-4 my-4">
                                <div className="col-span-6 md:col-span-3">
                                    <span>Days to sell</span>
                                    <p className="text-sm font-bold mb-3">22 Days</p>
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <span>Homes sell for</span>
                                    <p className="text-sm font-bold mb-3">6% below listing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
