import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import Link from 'next/link'; // Assuming you are using Next.js

const HomesForSaleMap = ({ center }) => {
    // Sample properties data (replace with actual data)
    const properties = [
        {
            id: 1,
            price: '500,000',
            minBedrooms: 3,
            bathrooms: 2,
            squareFeet: 1500,
            address: '123 Main St, San Francisco, CA',
            image: 'https://via.placeholder.com/600x200', 
        },
        {
            id: 2,
            price: '750,000',
            minBedrooms: 4,
            bathrooms: 3,
            squareFeet: 2000,
            address: '456 Elm St, San Francisco, CA',
            image: 'https://via.placeholder.com/600x200', 
        },
       
    ];

    return (
        <div className="relative h-[80vh] w-full">
            {/* Content boxes hovering over the map on the left side */}
            <div className="absolute top-4 left-4 bg-transparent p-4 w-[300px] max-h-[70vh] overflow-y-auto z-10 scrollbar-hide">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

            {/* Map container */}
            <div className="h-full w-full">
                
                <div className="h-full w-full bg-blue-200">
                    Homes for sale map content here
                </div>
            </div>
        </div>
    );
};

const PropertyCard = ({ property }) => {
    return (
        <Card className="mb-4">
            <CardHeader className="p-0">
                <div className="relative">
                    <Image
                        radius="none"
                        src={property.image}
                        alt={`Property image`}
                        width={600}
                        height={200}
                        classNames={{ wrapper: 'min-w-full' }}
                    />
                </div>
            </CardHeader>
            <CardBody className="overflow-hidden py-2">
                <Link href={`/property/${property.id}`}>
                    <div className="p-1">
                        <h3 className="text-bold text-2xl">£{property.price}</h3>
                        <div className="text-sm uppercase font-bold">
                            <span className="ml-0 text-bold">
                                &bull; {property.minBedrooms} Beds
                            </span>
                            <span className="ml-2 text-bold">
                                &bull; {property.bathrooms} Baths
                            </span>
                            <span className="ml-2 text-bold">
                                &bull; {property.squareFeet} Sqft
                            </span>
                        </div>
                        <p className="pt-2 text-default-500 text-sm">{property.address}</p>
                       
                    </div>
                </Link>
            </CardBody>
        </Card>
    );
};

export default HomesForSaleMap;
