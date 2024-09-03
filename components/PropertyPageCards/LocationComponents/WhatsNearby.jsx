import React from 'react';
import { Button, Card, CardBody } from '@nextui-org/react';

const WhatsNearbyMap = ({ center }) => {
    
    const places = [
        {
            id: 1,
            name: 'Deliciosos Tacos de Canasta',
            category: 'Tacos',
            address: '2386 Mission St',
            distance: '1.3 miles away',
        },
        {
            id: 2,
            name: 'Shic Hardware',
            category: 'Hardware',
            address: '58 Ocean Ave',
            distance: '1.3 miles away',
        },
        {
            id: 3,
            name: 'Moby Dick',
            category: 'Restaurants',
            address: '4049 18th St',
            distance: '1.3 miles away',
        },
        {
            id: 4,
            name: "Shotwell's",
            category: 'Restaurants',
            address: '3349 20th St',
            distance: '1.4 miles away',
        },

        {
            id: 4,
            name: "Shotwell's",
            category: 'Restaurants',
            address: '3349 20th St',
            distance: '1.4 miles away',
        },
        {
            id: 4,
            name: "Shotwell's",
            category: 'Restaurants',
            address: '3349 20th St',
            distance: '1.4 miles away',
        },
        {
            id: 4,
            name: "Shotwell's",
            category: 'Restaurants',
            address: '3349 20th St',
            distance: '1.4 miles away',
        },
        {
            id: 4,
            name: "Shotwell's",
            category: 'Restaurants',
            address: '3349 20th St',
            distance: '1.4 miles away',
        },
        {
            id: 4,
            name: "Shotwell's",
            category: 'Restaurants',
            address: '3349 20th St',
            distance: '1.4 miles away',
        },
    ];

    return (
        <div className="relative h-[80vh] w-full">
            {/* Scrollable button group at the top */}
            <div className="absolute top-4 left-4 right-4 flex space-x-2 overflow-x-auto z-10 scrollbar-hide">
                <Button variant='faded' >
                    Our Picks
                </Button >
                <Button variant='faded' >
                    Coffee
                </Button>
                <Button variant='faded' >
                    Beer
                </Button>
                <Button variant='faded'>
                    Groceries
                </Button>
                <Button variant='faded'>
                    Parks
                </Button>
                <Button variant='faded'>
                    Urgent Care Centers
                </Button>
                <Button variant='faded'>
                    Hospitals
                </Button>
                <Button variant='faded'>
                    Burgers
                </Button>
                <Button variant='faded'>
                    Burgers
                </Button>
                <Button variant='faded'>
                    Burgers
                </Button>
                <Button variant='faded'>
                    Burgers
                </Button>
                <Button variant='faded'>
                    Burgers
                </Button>

                
            </div>

            {/* Hovering content boxes on the left side */}
            <div className="absolute top-16 left-4 bg-transparent p-4 w-[300px] max-h-[70vh] overflow-y-auto z-10 scrollbar-hide">
                {places.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                ))}
            </div>

            {/* Map container */}
            <div className="h-full w-full">
               
                <div className="h-full w-full bg-blue-200">
                    Whats nearby map content here
                </div>
            </div>
        </div>
    );
};

const PlaceCard = ({ place }) => {
    return (
        <Card className="mb-4 rounded-md">
            <CardBody className="p-2 flex items-start ">
                <div>
                    <h3 className="text-bold">{place.name}</h3>
                    <p className="text-xs text-gray-600">{place.category} &bull; {place.address}</p>
                    <p className="text-xs text-gray-600">{place.distance}</p>
                </div>
            </CardBody>
        </Card>
    );
};

export default WhatsNearbyMap;
