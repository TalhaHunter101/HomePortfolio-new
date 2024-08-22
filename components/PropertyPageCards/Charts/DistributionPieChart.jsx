import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import {Icon} from '@iconify/react';

// Data for the outer and inner pie charts
const outerData = [
  { name: 'Houses', value: 3297, fill: '#9333ea' },
  { name: 'Condos', value: 800, fill: '#db2777' },
  { name: 'Townhomes', value: 500, fill: '#4f46e5' },
  { name: 'Multifamily', value: 300, fill: '#4b5563' },
];

const innerData = [
  { name: 'Houses', value: 3297, fill: '#9333ea' },
  { name: 'Condos', value: 1200, fill: '#db2777' },
  { name: 'Townhomes', value: 1500, fill: '#4f46e5' },
  { name: 'Multifamily', value: 300, fill: '#4b5563' },
];


const CustomLegend = ({ payload }) => (
    <ul className="p-0 m-0 text-center list-none" style={{ marginTop: '-20px' }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="inline-block mr-2.5">
          <Icon 
            icon="icon-park-solid:two-semicircles" 
            width="14" 
            height="14" 
            color={entry.color} 
            className="inline-block align-middle mr-1"
          />
          <span style={{ color: entry.color }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, percent, value, payload,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 15) * cos;
  const sy = cy + (outerRadius + 15) * sin;
  const mx = cx + (outerRadius + 35) * cos;
  const my = cy + (outerRadius + 35) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <defs>
        <filter id="shadow-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#333" />
        </filter>
      </defs>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={18}>
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        filter="url(#shadow)"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        filter="url(#shadow)"
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={10}>
        {`${payload.name}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={14} textAnchor={textAnchor} fill="#999" fontSize={10}>
        {`${value} homes`}
      </text>
    </g>
  );
};

// Main component
export const DistributionPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activeDataSet, setActiveDataSet] = useState(null);

  const onPieEnter = (dataSet) => (_, index) => {
    setActiveIndex(index);
    setActiveDataSet(dataSet);
  };

  const outerLegendPayload = outerData.map(item => ({
    value: item.name,
    type: 'square',
    color: item.fill,
  }));

  const innerLegendPayload = innerData.map(item => ({
    value: item.name,
    type: 'square',
    color: item.fill,
  }));

  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeDataSet === 'outer' ? activeIndex : -1}
            activeShape={renderActiveShape}
            data={outerData}
            cx="50%"
            cy="50%"
            innerRadius={135}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter('outer')}
            onMouseLeave={() => setActiveIndex(-1)}
          />
          <Pie
            activeIndex={activeDataSet === 'inner' ? activeIndex : -1}
            activeShape={renderActiveShape}
            data={innerData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter('inner')}
            onMouseLeave={() => setActiveIndex(-1)}
          />
        </PieChart>
      </ResponsiveContainer>
      <CustomLegend className="mb-4" payload={outerLegendPayload} />
    </div>
  );
};

export default DistributionPieChart;
