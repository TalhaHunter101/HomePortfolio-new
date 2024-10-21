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
const polygonStyle = () => {
  return {
    color: "#3388ff",
    weight: 2,
    fillColor: "#3388ff",
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
    <Marker position={[latitude, longitude]} icon={customIcon}>
      
    </Marker>
  ) : null;
};

// Adding a legend for flood risk intensity
// Adding a legend for flood risk intensity
// Adding a legend for flood risk intensity in a horizontal bar format
const FloodRiskLegend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");

      // Add custom HTML for the horizontal bar style
      div.innerHTML = `
        <div style="padding: 8px; background: white; border-radius: 5px; box-shadow: 0 0 15px rgba(0,0,0,0.2); width:20vw;">
          <h4 style="margin: 0 0 10px;">Flood risk</h4>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Very Low</span>
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
          <div style="display: flex; height: 15px;">
            <div style="flex: 1; background-color: #eff3ff;"></div>
            <div style="flex: 1; background-color: #bdd7e7;"></div>
            <div style="flex: 1; background-color: #6baed6;"></div>
            <div style="flex: 1; background-color: #3182bd;"></div>
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
      {floodAreas.map((polygon, index) => (
        <GeoJSON key={index} data={polygon} style={polygonStyle} />
      ))}
    </MapContainer>
  );
};

export default FloodMap;
