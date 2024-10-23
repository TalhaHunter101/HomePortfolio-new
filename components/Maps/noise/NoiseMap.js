"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import noiseData from "../../../public/noise.json";

// Custom polygon styling based on noise level
const polygonStyle = (noiseLevel) => {
  let color;
  switch (noiseLevel) {
    case "Very Low":
      color = "#ffffcc"; // Very Low (lightest color)
      break;
    case "Low":
      color = "#a1dab4"; // Low
      break;
    case "Medium":
      color = "#41b6c4"; // Medium
      break;
    case "High":
      color = "#2c7fb8"; // High
      break;
    case "Very High":
      color = "#253494"; // Very High (darkest color)
      break;
    default:
      color = "#505a9c"; // Default color
  }

  return {
    color: "#8ba5c9",
    weight: 2,
    fillColor: color,
    fillOpacity: 0.9,
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

// Adding a legend for noise levels
const NoiseLevelLegend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      // Add custom HTML for the legend
      div.innerHTML = `
        <div style="padding: 8px; background: white; border-radius: 5px; box-shadow: 0 0 15px rgba(0,0,0,0.2); width:20vw;">
          <h4 style="margin: 0 0 10px;">Noise Levels</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Very Low</span>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
            <span>Very High</span>
          </div>
          <div style="display: flex; height: 15px;">
            <div style="flex: 1; background-color: #ffffcc;"></div> <!-- Very Low -->
            <div style="flex: 1; background-color: #a1dab4;"></div> <!-- Low -->
            <div style="flex: 1; background-color: #41b6c4;"></div> <!-- Medium -->
            <div style="flex: 1; background-color: #2c7fb8;"></div> <!-- High -->
            <div style="flex: 1; background-color: #253494;"></div> <!-- Very High -->
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

const NoiseMap = ({ latitude, longitude, height }) => {
  return (
    <MapContainer
      center={[latitude || 53.2, longitude || -0.55]} // Default center if lat/long not provided
      zoom={10}
      style={{
        width: "100%",
        height: `${height ? height : "650px"}`,
      }}
    >
      {/* Add TileLayer to render the map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker for current location */}
      <LocationMarker latitude={latitude} longitude={longitude} />

      {/* Noise level legend */}
      <NoiseLevelLegend />

      {/* Noise areas polygons */}
      <GeoJSON
        data={noiseData.features} // Assuming noiseData is in GeoJSON format
        style={(feature) => polygonStyle(feature.properties.noiseLevel)}
      />
    </MapContainer>
  );
};

export default NoiseMap;