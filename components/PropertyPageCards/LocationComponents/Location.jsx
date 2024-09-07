import { IndivisualProprtyMapStatic } from '@/components/Maps';
import React from 'react';


const LocationMap = ({ center }) => {
    return (
        <div className='h-[60vh]'>
            <IndivisualProprtyMapStatic center={center} height='500px' />
        </div>
    );
};

export default LocationMap;
