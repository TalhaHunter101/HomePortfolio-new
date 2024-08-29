'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export function LocationCard ({ })  {
  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        
      </CardHeader>
      <CardBody>
      <div className="px-16 py-5 bg-default-white border border-gray-200 rounded-md">
        <p className="text-[12px] font-bold text-base mb-3">Location</p>
        <p className="text-[12px] font-medium">
          1906 Brentwood ST, San Francisco, CA 94107
        </p>
      </div>
      </CardBody>
    </Card>
  );
};


