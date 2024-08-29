'use client';
import React from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export function FinancialInfoCard  ({ price, roi })  {
  return (
    <Card className="m-4" style={{ minHeight: '150px' }}>
      <CardHeader>
        
      </CardHeader>
      <CardBody>
        <p><strong>Price:</strong> {price}</p>
        <p><strong>ROI:</strong> {roi}%</p>
      </CardBody>
    </Card>
  );
};


