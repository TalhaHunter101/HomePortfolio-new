import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import { Icon } from "@iconify/react";

// Main component
export const DistributionPieChart = ({ main_data, setbarchart }) => {
  const [data01, setData01] = useState([]);
  const [data02, setData02] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activePie, setActivePie] = useState(null);
  const [activeDataSet, setActiveDataSet] = useState(null);

  const COLORS = [
    // "#9333ea",
    "#db2777",
    "#4f46e5",
    // "#4b5563",
    // "#c084fc"
  ];

  useEffect(() => {
    if (main_data) {
      const formattedData01 = formatData(main_data);
      setData01(formattedData01);
      const formattedData02 = formatDataByBedrooms(main_data);
      const sortedData02 = sortDataByData01(formattedData02, formattedData01);
      setData02(sortedData02);
    }
  }, [main_data]);

  // Format data01
  function formatData(data) {
    const propertyTypeCount = data.reduce((acc, item) => {
      const propertyType = item._source.analyticsTaxonomy?.propertyType;
      if (propertyType) {
        acc[propertyType] = (acc[propertyType] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.keys(propertyTypeCount).map((key) => ({
      name: key,
      value: propertyTypeCount[key],
    }));
  }

  // Format data02 by bedrooms
  function formatDataByBedrooms(data) {
    const propertyTypeByBedrooms = {};
    data.forEach((item) => {
      const propertyType = item._source.analyticsTaxonomy?.propertyType;
      const bedrooms = item._source.analyticsTaxonomy?.bedsMax;

      if (propertyType && bedrooms) {
        if (!propertyTypeByBedrooms[bedrooms]) {
          propertyTypeByBedrooms[bedrooms] = {};
        }
        propertyTypeByBedrooms[bedrooms][propertyType] =
          (propertyTypeByBedrooms[bedrooms][propertyType] || 0) + 1;
      }
    });

    const formattedData = [];
    Object.keys(propertyTypeByBedrooms).forEach((bedrooms) => {
      const propertyTypes = propertyTypeByBedrooms[bedrooms];
      Object.keys(propertyTypes).forEach((propertyType) => {
        formattedData.push({
          name: `${propertyType}~beds-${bedrooms}`,
          value: propertyTypes[propertyType],
        });
      });
    });

    return formattedData;
  }

  // Sort data02 based on data01
  function sortDataByData01(data02, data01) {
    const propertyTypeIndex = {};
    data01.forEach((item, index) => {
      propertyTypeIndex[item.name] = index;
    });

    data02.sort((a, b) => {
      const typeA = a.name.split("~").slice(0, -1).join("~");
      const typeB = b.name.split("~").slice(0, -1).join("~");

      if (typeA !== typeB) {
        return (
          (propertyTypeIndex[typeA] ?? Infinity) -
          (propertyTypeIndex[typeB] ?? Infinity)
        );
      }

      const numberA = parseInt(a.name.split("~").pop());
      const numberB = parseInt(b.name.split("~").pop());
      return numberA - numberB;
    });

    return data02;
  }

  const onPieEnter = (dataSet) => (_, index) => {
    setActiveIndex(index);
    setActivePie(dataSet);
    setActiveDataSet(dataSet);
  };

  const onPieClick = () => {
    let clickedData;
    if (activePie === "inner") {
      clickedData = data01[activeIndex];
    } else if (activePie === "outer") {
      clickedData = data02[activeIndex];
    }

    if (clickedData) {
      setbarchart({
        type: activePie,
        name: clickedData.name,
        value: clickedData.value,
      });
    }
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      percent,
      value,
      payload,
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 15) * cos;
    const sy = cy + (outerRadius + 15) * sin;
    const mx = cx + (outerRadius + 35) * cos;
    const my = cy + (outerRadius + 35) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g onClick={onPieClick}>
        <defs>
          <filter id="shadow-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#333" />
          </filter>
        </defs>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={fill}
          fontSize={18}
        >
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
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          fontSize={10}
        >
          {`${payload.name}`}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={14}
          textAnchor={textAnchor}
          fill="#999"
          fontSize={10}
        >
          {`${value} homes`}
        </text>
      </g>
    );
  };

  const outerLegendPayload = data01.map((item) => ({
    value: item.name,
    type: "square",
    color: item.fill,
  }));

  const innerLegendPayload = data02.map((item) => ({
    value: item.name,
    type: "square",
    color: item.fill,
  }));

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeDataSet === "outer" ? activeIndex : -1}
            activeShape={renderActiveShape}
            data={data01}
            cx="50%"
            cy="50%"
            innerRadius={135}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter("outer")}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Pie
            activeIndex={activeDataSet === "inner" ? activeIndex : -1}
            activeShape={renderActiveShape}
            data={data02}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter("inner")}
            onMouseLeave={() => setActiveIndex(-1)}
          >
            {data02.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <CustomLegend className="mb-4" payload={outerLegendPayload} />
    </div>
  );
};

const CustomLegend = ({ payload }) => (
  <ul className="p-0 m-0 text-center list-none" style={{ marginTop: "-20px" }}>
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

export default DistributionPieChart;
