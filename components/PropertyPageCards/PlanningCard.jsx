'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { StatusCard } from './PlanningComponents/Status';
import Carousel from './PlanningComponents/GraphCarousal';

import { ConstraintsList } from './PlanningComponents/ConstraintList';


const statusData = [
    { label: 'Approved', count: 27, iconColor: 'bg-green-500' },
    { label: 'In progress', count: 27, iconColor: 'bg-blue-500' },
    { label: 'Pending', count: 27, iconColor: 'bg-orange-500' },
    { label: 'Rejected', count: 27, iconColor: 'bg-red-500' },
    { label: 'Withdrawn', count: 27, iconColor: 'bg-gray-500' },
];
const dummyData = [
    { leftContent: "Left Content 1", rightContent: "Right Content 1" },
    { leftContent: "Left Content 2", rightContent: "Right Content 2" },
    { leftContent: "Left Content 3", rightContent: "Right Content 3" }
];
export function PlanningCard({ title }) {
    return (
        <Card className="m-4" style={{ minHeight: '200px' }}>
            <CardHeader>
                <h2 className="text-xl font-bold">{title}</h2>
            </CardHeader>
            <CardBody>
                <div className='flex flex-col border border-subtle-border rounded-md'>
                    {/* Status Cards */}
                    <div className="flex p-2  justify-between ">
                        {statusData.map((status, index) => (
                            <StatusCard
                                key={index}
                                label={status.label}
                                count={status.count}
                                iconColor={status.iconColor}
                            />
                        ))}
                    </div>

                    {/* Additional Content */}
                    <div className="">

                        <Carousel data={dummyData} />
                    </div>
                    <div className="z-10 w-full overflow-hidden rounded-br-lg rounded-bl-lg">
                        <div className="hidden xl:flex h-96">
                            <div className="flex relative overflow-hidden sm:mx-4 gap-2 w-full">
                                {/* Map section on the left */}
                                <div className="flex-1 z-40 h-full">
                                    <div className="h-full w-full">
                                        <div className="w-full h-full bg-white border-1 maplibregl-map mapboxgl-map">
                                            <div>
                                                map here
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex-1  flex flex-col justify-center h-full">
                                    <div className="relative w-full h-full flex items-center">


                                        <ConstraintsList />
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
