import { Icon } from '@iconify/react';
import { Card } from '@nextui-org/react';
import React from 'react'


const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center">
      <Icon icon={icon} className="mr-2 w-5 h-5" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );

  
function PropertyDetails({data}) {
  return (
    <Card className="p-4 flex-1">
    <p className="font-semibold mb-2">ADDRESS</p>
    <p className="mb-4">{data?.full_address}</p>
    <p className="font-semibold mb-2">FEATURES</p>
    <div className="grid grid-cols-2 gap-2">
      <DetailItem icon="mdi:home" label="Property type:" value={data?.attributes?.propertyType} />
      <DetailItem icon="mdi:bed" label="Bedrooms:" value={data?.attributes?.bedrooms} />
      <DetailItem icon="mdi:toilet" label="Bathrooms:" value={data?.attributes?.bathrooms} />
      <DetailItem icon="mdi:ruler-square" label="Living area:" value="1,864 sq.ft." />
    </div>
  </Card>
  )
}

export default PropertyDetails