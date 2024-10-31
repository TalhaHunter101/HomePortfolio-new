import { Icon } from '@iconify/react';
import { Card } from '@nextui-org/react';
import React from 'react'


const DetailItem = ({ icon, label, value, color }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
    <Icon icon={icon} className="mr-3 w-6 h-6" style={{ color }} />
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

function PropertyDetails({data, colors}) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Property Details</h3>
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-600">PROPERTY ADDRESS</p>
        <p className="text-base font-semibold text-gray-900">{data?.full_address}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <DetailItem 
          icon="mdi:home" 
          label="Property Type" 
          value={data?.attributes?.propertyType}
          color={colors.primary}
        />
        <DetailItem 
          icon="mdi:bed" 
          label="Bedrooms" 
          value={data?.attributes?.bedrooms}
          color={colors.primary}
        />
        <DetailItem 
          icon="mdi:toilet" 
          label="Bathrooms" 
          value={data?.attributes?.bathrooms}
          color={colors.primary}
        />
        <DetailItem 
          icon="mdi:ruler-square" 
          label="Living Area" 
          value="1,864 sq.ft."
          color={colors.primary}
        />
        <DetailItem 
          icon="mdi:calendar" 
          label="Year Built" 
          value={data?.attributes?.yearBuilt || "N/A"}
          color={colors.primary}
        />
        <DetailItem 
          icon="mdi:home-variant" 
          label="Property Style" 
          value={data?.attributes?.propertyStyle || "N/A"}
          color={colors.primary}
        />
      </div>
    </Card>
  );
}

export default PropertyDetails;