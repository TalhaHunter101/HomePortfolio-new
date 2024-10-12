import { IndivisualProprtyMapStatic } from '@/components/Maps';
import React from 'react';


const LocationMap = ({ center, isInteractive }) => {
    return (
        <div className={`h-[40vh] md:h-[60vh] ${ isInteractive ? 'pointer-events-auto' : 'pointer-events-none' }` }>
            <IndivisualProprtyMapStatic center={center} height='500px' />
        </div>
    );
};

export default LocationMap;
