"use client"
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  useMap,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import WMSLayer from "./WMSLayers";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet-gesture-handling"

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

const MarkersWithCustomIcon = ({ center }) => {
  const map = useMap();

  const customIcon = L.icon({
    iconUrl: "/icons/mapmarker.svg",
    iconSize: [32, 32],
  });

  useEffect(() => {
    if (center?.lat && center?.lng) {
      map.setView([center?.lat, center?.lng], 16);
    }
  }, [center?.lat, center?.lng, map]);

  return (
    <Marker
      position={[center?.lat, center?.lng]}
      icon={customIcon}
    />
  );
};

// Convert MULTIPOLYGON string to GeoJSON format
const parseFloodZoneData = (floodZoneData) => {
  const coordinates = floodZoneData.geometry
    .replace("MULTIPOLYGON (((", "")
    .replace(")))", "")
    .split("),(")
    .map((polygon) =>
      polygon.split(",").map((point) =>
        point
          .trim()
          .split(" ")
          .map((coord) => parseFloat(coord))
      )
    );

  return {
    type: "Feature",
    properties: {
      floodRiskLevel: floodZoneData["flood-risk-level"],
      floodRiskType: floodZoneData["flood-risk-type"],
    },
    geometry: {
      type: "MultiPolygon",
      coordinates: [coordinates], // GeoJSON expects an array of polygons
    },
  };
};

const FloodRiskOverlay = ({ floodData }) => {
  const map = useMap();
  
  useEffect(() => {
    if (floodData) {
      const geoJsonLayer = L.geoJSON(floodData, {
        style: function () {
          return { color: "#e28f21", weight: 8 }; // Customize flood zone style
        },
      }).addTo(map);

      return () => {
        map.removeLayer(geoJsonLayer);
      };
    }
  }, [floodData, map]);

  return null;
};

const IndivisualProprtyMapStatic = ({ height = "650px", center, floodZoneData, postcode }) => {
  const zoom = 13;

  // Parse flood zone data to GeoJSON
  const floodZoneGeoJSON = floodZoneData ? parseFloodZoneData(floodZoneData) : null;

  return (
    <div>
      <MapContainer
        center={[center?.lat, center?.lng]}
        zoom={zoom}
        maxZoom={28}
        minZoom={1}
        style={{
          width: "100%",
          height: height,
        }}
        gestureHandling={true} // Enable gesture handling
      >
        <MapTilerLayerComponent />
        <MarkersWithCustomIcon center={center} />
        {floodZoneGeoJSON && <FloodRiskOverlay floodData={floodZoneGeoJSON} />}
        <WMSLayer postcode={postcode} />
      </MapContainer>
    </div>
  );
};

export default IndivisualProprtyMapStatic;
