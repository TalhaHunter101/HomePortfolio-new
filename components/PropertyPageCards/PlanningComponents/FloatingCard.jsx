import React from "react";
import { Card, CardBody, Chip, } from "@nextui-org/react";

export default function FloatingCard() {
    return (
        <Card  className='w-80  h-80  '>
            <CardBody>
            
                <h3 className="font-semibold text-xs mb-2">Planning Applications</h3>
                <div className="bg-gray-100 shadow-md p-2 rounded-md mb-2">
                    <span className="text-xs text-gray-500">Received 02 May 2023</span>
                    <div className="flex items-center">
                    <Chip size="sm" className="bg-yellow-400 text-white text-xs font-bold px-2 py-1  mr-2">Pending</Chip>
                        <span className="font-semibold">Tree Removal Application</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        TPO - POCKLINGTON NO. 16 - 2004 (REF 845) G2 - Fell 1 no. dead Willow tree (T558)
                    </p>
                </div>
                <div className="bg-gray-100 shadow-md p-2 rounded-md mb-2">
                    <span className="text-xs text-gray-500">Received 12 April 2023</span>
                    <div className="flex items-center">
                        <Chip size="sm" className="bg-yellow-400 text-white text-xs font-bold px-2 py-1  mr-2">Pending</Chip>
                        <span className="font-semibold">Full Planning Application</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        This Full Planning Application (Reference Number: ABC123/2022) pertains to the construction of a new residential building.
                    </p>
                </div>
                <div className="bg-gray-100 shadow-md p-2 rounded-md">
                    <span className="text-xs text-gray-500">Received 05 April 2023</span>
                    <div className="flex items-center">
                         <Chip size="sm" className="bg-green-400 text-white text-xs font-bold px-2 py-1  mr-2">Approved</Chip>
                        <span className="font-semibold">Tree Removal Application</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        Removal of an oak tree located in the front yard.
                    </p>
                </div>
                </CardBody>
        </Card>
    )
}