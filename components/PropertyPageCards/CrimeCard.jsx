'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export function CrimeCard ({title, price, roi })  {
  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        <h2 className="text-xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody>
        <h1 className='text-xxxl'>some heinous crimes</h1>
      </CardBody>
    </Card>
  );
};


