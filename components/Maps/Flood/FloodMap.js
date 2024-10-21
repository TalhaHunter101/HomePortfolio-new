
"use client"
// Import necessary components
import React, { useEffect } from "react";
import { MapContainer, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import L from "leaflet";

// MapTiler layer component
const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: "685vx5hNgMMOFvoFvLAX",
    }).addTo(map);

    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map]);

  return null;
};

// Custom polygon styling function
// Custom polygon styling based on severity level
const polygonStyle = (severityLevel) => {
  let color;
  switch (severityLevel) {
    case 1:
      color = "#ffffcc"; // Very Low (lightest color)
      break;
    case 2:
      color = "#a1dab4"; // Low
      break;
    case 3:
      color = "#41b6c4"; // Medium
      break;
    case 4:
      color = "#2c7fb8"; // High
      break;
    case 5:
      color = "#253494"; // Severe (darkest color)
      break;
    default:
      color = "#3388ff"; // Default color
  }

  return {
    color: color,
    weight: 2,
    fillColor: color,
    fillOpacity: 0.4,
  };
};

// Adding a marker for the current location
const LocationMarker = ({ latitude, longitude }) => {
  const map = useMap();
  const customIcon = L.icon({
    iconUrl: "/icons/mapmarker.svg",
    iconSize: [32, 32],
  });

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 13); // Fly to the user's current location
    }
  }, [latitude, longitude, map]);

  return latitude && longitude ? (
    <Marker position={[latitude, longitude]} icon={customIcon}></Marker>
  ) : null;
};

// Adding a legend for flood risk intensity
// Adding a legend for flood risk intensity
// Adding a legend for flood risk intensity in a horizontal bar format
// Adding a legend for flood risk intensity in a horizontal bar format based on severity level
const FloodRiskLegend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      // Add custom HTML for the horizontal bar style with updated severity colors
      div.innerHTML = `
        <div style="padding: 8px; background: white; border-radius: 5px; box-shadow: 0 0 15px rgba(0,0,0,0.2); width:20vw;">
          <h4 style="margin: 0 0 10px;">Flood risk</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Very Low</span>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
            <span>Severe</span>
          </div>
          <div style="display: flex; height: 15px;">
            <div style="flex: 1; background-color: #ffffcc;"></div> <!-- Very Low -->
            <div style="flex: 1; background-color: #a1dab4;"></div> <!-- Low -->
            <div style="flex: 1; background-color: #41b6c4;"></div> <!-- Medium -->
            <div style="flex: 1; background-color: #2c7fb8;"></div> <!-- High -->
            <div style="flex: 1; background-color: #253494;"></div> <!-- Severe -->
          </div>
        </div>
      `;

      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};


const FloodMap = ({ floodAreas, latitude, longitude, height }) => {
  console.log("floodAreas is", floodAreas);

  return (
    <MapContainer
      center={[latitude || 53.2, longitude || -0.55]} // Default center if lat/long not provided
      zoom={10}
      style={{
        width: "100%",
        height: `${height ? height : "650px"}`,
      }}
    >
      {/* MapTiler Layer */}
      <MapTilerLayerComponent />

      {/* Marker for current location */}
      <LocationMarker latitude={latitude} longitude={longitude} />

      {/* Flood risk legend */}
      <FloodRiskLegend />

      {/* Flood areas polygons */}
      {floodAreas
        .filter((area) => area?.polygonData && area?.polygonData.features) // Filter out areas with null or invalid polygonData
        .map((area, index) => (
          <GeoJSON
            key={index}
            data={area.polygonData.features} // Only render if polygonData is valid
            style={() => polygonStyle(area.severityLevel)}
          />
        ))}
    </MapContainer>
  );
};

export default FloodMap;
