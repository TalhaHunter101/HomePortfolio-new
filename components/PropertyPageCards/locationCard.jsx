'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { IndivisualProprtyMapStatic } from '../Maps';

export function LocationCard ({data })  {


  const center = {
    lat: data?.location?.coordinates?.latitude,
    lng: data?.location?.coordinates?.longitude,
  }
  
  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        
      </CardHeader>
      <CardBody>
      <div className="px-16 py-5 bg-default-white border border-gray-200 rounded-md">
        <p className="text-[12px] font-bold text-base mb-3">Location</p>
        <p className="text-[12px] font-medium">
          {data?.address}
        </p>
      </div>
        <div className='h-[40vh]'>

      <IndivisualProprtyMapStatic center={center} height='300px' />
      </div>

      </CardBody>
    </Card>
  ); 
};


