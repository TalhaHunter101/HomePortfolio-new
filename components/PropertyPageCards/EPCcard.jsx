'use client';
import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Divider } from "@nextui-org/react";
import { EnergyPerformanceTable } from './EPCcomponents/table'; 
import { PerformanceSection } from './EPCcomponents/PerformanceSection';

const tableData = [
    { feature: "Wall", description: "Cavity wall, as built, insulated (assumed)", rating: "Good" },
    { feature: "Roof", description: "Pitched, 250 mm loft insulation", rating: "Average" },
    { feature: "Wall", description: "Cavity wall, as built, insulated (assumed)", rating: "Good" },
    { feature: "Roof", description: "Pitched, 250 mm loft insulation", rating: "Average" },
    { feature: "Wall", description: "Cavity wall, as built, insulated (assumed)", rating: "Good" },
    { feature: "Roof", description: "Pitched, 250 mm loft insulation", rating: "Average" },
    { feature: "Wall", description: "Cavity wall, as built, insulated (assumed)", rating: "Good" },
    { feature: "Roof", description: "Pitched, 250 mm loft insulation", rating: "Average" },
    { feature: "Roof", description: "Pitched, 250 mm loft insulation", rating: "Average" },
    { feature: "Wall", description: "Cavity wall, as built, insulated (assumed)", rating: "Good" },
    { feature: "Roof", description: "Pitched, 250 mm loft insulation", rating: "Average" },
    { feature: "Wall", description: "Cavity wall, as built, insulated (assumed)", rating: "Good" },
    { feature: "Roof", description: "Pitched, 250 mm loft insulation", rating: "Average" },
];

export function EPCCard({ title, price, roi }) {
    return (
        <Card className="m-4  " style={{ maxHeight: '600px', minWidth: '800px', }}>
            <CardHeader>
                
            </CardHeader>
            <CardBody >
                <div className='overflow-hidden '>
                    <div className="flex p-4 border border-subtle-border rounded-md">
                        {/* Left Column for EPC and Energy Rating */}
                        <div className="w-1/2 pr-4">
                            <h3 className="font-semibold mb-2">Energy Performance Certificate (EPC)</h3>
                            <p className="mb-4 text-gray-500 text-xs">This property&apos;s current energy rating is <strong>D</strong>. It has the potential to be <strong>B</strong>.</p>

                            {/* Placeholder for EPC graph */}
                            <div className="bg-orange-300 h-40 mb-4"></div>


                            <Divider className="my-4" />


                            <EnergyPerformanceTable data={tableData} />
                        </div>


                        <Divider orientation="vertical" className="mx-4 h-auto" />

                        {/* Right Column for Performance */}
                        <PerformanceSection />
                    </div>
                </div>
            </CardBody>

        </Card>
    );
};
