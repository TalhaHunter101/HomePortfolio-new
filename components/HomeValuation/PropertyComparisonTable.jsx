"use client";
import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { Icon } from '@iconify/react';

const PropertyComparisonTable = ({ data }) => {
  const refProperty = {
    key: "0", // Assign key "0" to ensure it's first in the table
    address: data.full_address || "N/A",
    price: `£${data.market_activity.averagePricePaid}` || "N/A",
    bedrooms: data.attributes.bedrooms || "N/A",
    bathrooms: data.attributes.bathrooms || "N/A",
    livingRooms: data.attributes.livingRooms || "N/A",
    tenure: data.attributes.tenure || "N/A",
    propertyType: data.attributes.propertyType || "N/A",
    similarity: "100%", // 100% similarity with itself
  };

  const columns = [
    { key: "address", label: "Address" },
    { key: "price", label: "Price" },
    { key: "bedrooms", label: "Bedrooms" },
    { key: "bathrooms", label: "Bathrooms" },
    { key: "livingRooms", label: "Living Rooms" },
    { key: "tenure", label: "Tenure" },
    { key: "propertyType", label: "Property Type" },
    { key: "similarity", label: "Similarity (%)" },
  ];

  const calculateSimilarity = (listing) => {
    let similarity = 0;
    if (listing.counts.numBedrooms === refProperty.bedrooms) similarity += 25;
    if (listing.counts.numBathrooms === refProperty.bathrooms) similarity += 25;
    if (listing.counts.numLivingRooms === refProperty.livingRooms) similarity += 25;
    if (listing.pricing.label === refProperty.price) similarity += 25;
    return similarity;
  };

  const rows = [
    refProperty, // Include reference property as the first row
    ...data.similarListingsV2.map((listing, index) => {
      if (!listing || Object.keys(listing).length === 0) {
        return {
          key: `${index + 1}`,
          address: "N/A",
          price: "N/A",
          bedrooms: "N/A",
          bathrooms: "N/A",
          livingRooms: "N/A",
          tenure: "N/A",
          propertyType: "N/A",
          similarity: "N/A",
        };
      }

      const similarity = calculateSimilarity(listing);

      return {
        key: `${index + 1}`,
        address: listing.displayAddress || "N/A",
        price: listing.pricing.label || "N/A",
        bedrooms: listing.counts.numBedrooms || "N/A",
        bathrooms: listing.counts.numBathrooms || "N/A",
        livingRooms: listing.counts.numLivingRooms || "N/A",
        tenure: refProperty.tenure,
        propertyType: refProperty.propertyType,
        similarity: `${similarity}%`,
      };
    })
  ];

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    
    switch (columnKey) {
      case "address":
        return (
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2" style={{backgroundColor: item.key === "0" ? "#00D1FF" : "#E5E7EB"}}>
              {item.key === "0" ? <Icon icon="mdi:home" className="text-white" /> : item.key}
            </div>
            <div className="whitespace-pre-line">{cellValue}</div>
          </div>
        );
      case "similarity":
        return (
          <Tooltip content={`${cellValue} similar to the subject property`}>
            <div className="cursor-help">{cellValue}</div>
          </Tooltip>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table 
      aria-label="Property Comparison Table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PropertyComparisonTable;
