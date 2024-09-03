import React from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import { Icon } from '@iconify/react';

const SchoolsMap = ({ center }) => {
    
    const schools = [
        { id: 1, number: '2', name: 'Mission Education Center', type: 'Public, K-5', distance: '0.15 mi away' },
        { id: 2, number: '3', name: "St. Paul's School", type: 'Private, K-8', distance: '0.18 mi away' },
        { id: 3, number: '4', name: 'Fairmount Elementary School', type: 'Public, K-5', distance: '0.22 mi away' },
        { id: 4, number: '5', name: 'Glen Park School', type: 'Public, K-5', distance: '0.35 mi away' },
        { id: 5, number: '6', name: 'Rooftop School', type: 'Public, K-8', distance: '0.40 mi away' },
        { id: 6, number: '7', name: 'St. James School', type: 'Private, K-8', distance: '0.45 mi away' },
        { id: 7, number: '8', name: 'Buena Vista Horace Mann', type: 'Public, K-8', distance: '0.50 mi away' },
    ];

    return (
        <div className="relative h-[80vh] w-full">
            
            <div className="absolute top-8 pl-4 left-4 z-20">
                <ButtonGroup size='' variant='faded' className="w-full">
                    <Button startContent={<Icon icon="tabler:school" />} >Elementary</Button>
                    <Button startContent={<Icon icon="tabler:school" />} >Middle</Button>
                    <Button startContent={<Icon icon="tabler:school" />} >High</Button>
                </ButtonGroup>
            </div>

            {/* Content boxes hovering over the map on the left side */}
            <div className="absolute top-20 left-4 bg-transparent p-4 w-[400px] max-h-[70vh] overflow-y-auto z-10 scrollbar-hide">
                {schools.map((school) => (
                    <div key={school.id} className="mb-4 p-4 bg-gray-100 rounded-lg ">
                        <h2 className="text-xl font-bold">{school.number}</h2>
                        <p className="font-medium text-sm">{school.name}</p>
                        <p className="text-xs text-gray-600">{school.type}</p>
                        <p className="text-xs text-gray-600">{school.distance}</p>
                    </div>
                ))}
            </div>

            {/* Map container */}
            <div className="h-full w-full">
                {/* Example map content placeholder */}
                <div className="h-full w-full bg-blue-200">
                    Map content here
                </div>
            </div>
        </div>
    );
};

export default SchoolsMap;
