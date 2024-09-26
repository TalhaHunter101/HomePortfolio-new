import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import { Icon } from "@iconify/react";

// CustomLegend component with merged logic
const CustomLegend = ({ data, colors }) => (
  <ul className="p-0 text-xs m-0 text-center list-none lg:text-sm" style={{ marginTop: "-20px" }}>
    {data.map((entry, index) => (
      <li key={`item-${index}`} className="inline-block mr-2.5">
        <Icon
          icon="icon-park-solid:two-semicircles"
          width="14"
          height="14"
          color={colors[index % colors.length]}
          className="inline-block align-middle mr-1"
        />
        <span style={{ color: colors[index % colors.length] }}>{entry.name}</span>
      </li>
    ))}
  </ul>
);

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

export const DistributionPieChart = ({ main_data, setbarchart }) => {
  const [data01, setData01] = useState([]);
  const [data02, setData02] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activePie, setActivePie] = useState(null);
  const [activeDataSet, setActiveDataSet] = useState(null);

  const COLORS = ["#9333ea", "#db2777", "#4f46e5", "#4b5563"];

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
      const propertyType = mapPropertyType(item._source.analyticsTaxonomy?.propertyType);
      // Only count property types that are in the allowed list
      if (["Flat", "Detached", "Semi-detached", "Terraced"].includes(propertyType)) {
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
      const propertyType = mapPropertyType(item._source.analyticsTaxonomy?.propertyType);
      const bedrooms = item._source.analyticsTaxonomy?.bedsMax;

      // Only include property types in the allowed list
      if (propertyType && bedrooms && ["Flat", "Detached", "Semi-detached", "Terraced"].includes(propertyType)) {
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
        return (propertyTypeIndex[typeA] ?? Infinity) - (propertyTypeIndex[typeB] ?? Infinity);
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

  // Define responsive radius sizes based on screen width
  const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const innerRadius = isLargeScreen ? 40 : 30;
  const outerRadius = isLargeScreen ? 150 : 80;

  return (
    <div className="lg:w-full lg:h-full h-96 w-60 mx-auto">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeDataSet === "outer" ? activeIndex : -1}
            activeShape={renderActiveShape}
            data={data01}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
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
        </PieChart>
      </ResponsiveContainer>

      <CustomLegend data={data01} colors={COLORS} />
    </div>
  );
};

export default DistributionPieChart;
