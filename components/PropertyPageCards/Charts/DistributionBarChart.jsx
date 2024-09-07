'use client';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CardBody } from '@nextui-org/react';

// Property type mapping function (same as in the pie chart)
function mapPropertyType(type) {
  const flatTypes = ["flat", "studio", "maisonette", "park_home"];
  const semiDetachedTypes = ["semi_detached", "semi_detached_bungalow", "link_detached"];
  const detachedTypes = ["detached", "detached_bungalow", "barn_conversion", "cottage", "lodge", "bungalow", "hotel"];
  const terracedTypes = ["terraced", "town_house", "end_terrace", "mews"];

  if (flatTypes.includes(type)) return "Flat";
  if (semiDetachedTypes.includes(type)) return "Semi-detached";
  if (detachedTypes.includes(type)) return "Detached";
  if (terracedTypes.includes(type)) return "Terraced";

  return type || "Unknown"; // Fallback to "Unknown" or original type if not matched
}

export const DistributionBarChart = ({ main_data, barchart }) => {
  const [data, setData] = useState([]);

  // Updated filterMainData function with property type mapping
  const filterMainData = (barchartValue) => {
    if (!barchartValue) return [];
  
    const parts = barchartValue.name.split('~');
    const propertyType = mapPropertyType(parts[0]); // Apply property type mapping
    const bedsInfo = parts.length > 1 ? parts[1] : null;
  
    // Only include the allowed property types
    if (!["Flat", "Detached", "Semi-detached", "Terraced"].includes(propertyType)) {
      return [];
    }
  
    return main_data.filter(item => {
      const itemPropertyType = mapPropertyType(item._source.analyticsTaxonomy?.propertyType);
      const itemBedrooms = item._source.analyticsTaxonomy?.bedsMax;
  
      const typeMatches = itemPropertyType === propertyType;
  
      if (!bedsInfo) {
        return typeMatches;
      }
  
      if (bedsInfo.startsWith('beds-')) {
        const requiredBeds = bedsInfo.split('-')[1];
        return typeMatches && itemBedrooms === requiredBeds;
      }
  
      return typeMatches;
    });
  };
  

  const getPriceRanges = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const prices = data.map(item => Number(item._source?.pricing?.internalValue)).filter(price => !isNaN(price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice;
    const step = range / 10;

    const ranges = Array.from({ length: 10 }, (_, i) => ({
      min: minPrice + i * step,
      max: minPrice + (i + 1) * step,
      count: 0,
    }));

    data.forEach(item => {
      const price = Number(item._source?.pricing?.internalValue);
      if (!isNaN(price)) {
        const rangeIndex = ranges.findIndex(r => price >= r.min && price < r.max);
        if (rangeIndex !== -1) {
          ranges[rangeIndex].count++;
        }
      }
    });

    return ranges.map(range => ({
      priceRange: `£${Math.round(range.min / 1000)}k - £${Math.round(range.max / 1000)}k`,
      homes: range.count,
    }));
  };

  useEffect(() => {
    if (barchart && main_data) {
      const filteredData = filterMainData(barchart);
      const priceRanges = getPriceRanges(filteredData);
      setData(priceRanges);
    }
  }, [barchart, main_data]);

  return (
    <CardBody className="w-full flex flex-col justify-between bg-white rounded-lg">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            barCategoryGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="priceRange"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{
                value: 'Houses List Price',
                position: 'insideBottom',
                offset: -10,
                fill: '#6b7280',
                fontSize: 14,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{
                value: '# of Homes',
                angle: -90,
                position: 'insideLeft',
                offset: 0,
                fill: '#6b7280',
                fontSize: 14,
              }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e5e7eb',
                padding: '5px',
                borderRadius: '4px',
              }}
              labelStyle={{
                color: '#111827',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '5px',
              }}
              itemStyle={{
                color: '#3b82f6',
                fontSize: '12px',
              }}
              formatter={(value, name, props) => {
                return [
                  `# of homes: ${value}`,
                  `${props.payload.priceRange}`,
                ];
              }}
              labelFormatter={() => ``}
            />
            <Bar dataKey="homes" fill="rgba(156, 39, 176, 0.5)" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardBody>
  );
};
