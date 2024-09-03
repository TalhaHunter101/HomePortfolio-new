import { IndivisualProprtyMapStatic } from '@/components/Maps';
import React from 'react';


const LocationMap = ({ center }) => {
    return (
        <div className='h-[40vh]'>
            <IndivisualProprtyMapStatic center={center} height='300px' />
        </div>
    );
};

export default LocationMap;
