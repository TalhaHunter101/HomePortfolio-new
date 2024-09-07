import React from 'react';
import { Icon } from '@iconify/react';

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
        }
    ];

    return (
        <div className="relative h-[80vh] w-full">
            {/* Scrollable buttons at the top */}
            <div className="absolute top-4 left-4 right-4 flex space-x-2 overflow-x-auto z-10 scrollbar-hide">
                <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="ph:star-fill" width="18" height="18" />
                    <span className="text-sm">Our Picks</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="line-md:coffee-half-empty-filled-loop" width="18" height="18" color="brown" />
                    <span className="text-sm">Coffee</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="ion:beer" width="18" height="18" color="goldenrod" />
                    <span className="text-sm">Beer</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="material-symbols:grocery-sharp" width="18" height="18" color="purple" />
                    <span className="text-sm">Groceries</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="ic:twotone-park" width="18" height="18" color="green" />
                    <span className="text-sm">Parks</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="icon-park:first-aid-kit" width="18" height="18" />
                    <span className="text-sm">Urgent Care</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="noto-v1:hospital" width="18" height="18" />
                    <span className="text-sm">Hospitals</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="noto-v1:hamburger" width="18" height="18" />
                    <span className="text-sm">Burgers</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="ph:chef-hat-duotone" width="18" height="18" color="blue" />
                    <span className="text-sm">Restaurants</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="twemoji:taco" width="18" height="18" />
                    <span className="text-sm">Tacos</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="material-symbols:hardware-sharp" width="18" height="18" color="brown" />
                    <span className="text-sm">Hardware</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-md whitespace-nowrap">
                    <Icon icon="cbi:roomsnursery" width="18" height="18" color="purple" />
                    <span className="text-sm">Daycare</span>
                </button>
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
        <div className="mb-4 bg-white rounded-md shadow-md">
            <div className="p-2 flex items-start">
                <div>
                    <h3 className="font-bold">{place.name}</h3>
                    <p className="text-xs text-gray-600">{place.category} &bull; {place.address}</p>
                    <p className="text-xs text-gray-600">{place.distance}</p>
                </div>
            </div>
        </div>
    );
};

export default WhatsNearbyMap;
