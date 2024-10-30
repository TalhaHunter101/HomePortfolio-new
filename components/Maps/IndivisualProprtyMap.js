"use client";
import { useEffect } from "react";
import { MapContainer, Marker, useMap, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import WMSLayer from "./WMSLayers";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet-gesture-handling";

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

  return <Marker position={[center?.lat, center?.lng]} icon={customIcon} />;
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

const BoundaryLayer = ({ geom }) => {
  const map = useMap();

  useEffect(() => {
    if (!geom) {
      console.log("No geometry provided");
      return;
    }

    // Get the geometry data from either location or polygon property
    const geometry = geom.location || geom.polygon || geom;

    console.log("Drawing boundary for:", geometry?.type);

    // Clear existing GeoJSON layers
    map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
      }
    });

    if (!geometry?.coordinates) {
      console.log("No valid coordinates to draw");
      return;
    }

    try {
      const geoType = geometry.type.toLowerCase();
      console.log("Processing geometry type:", geoType);

      // Clean coordinates function to handle both single coordinates and arrays of coordinates
      const cleanCoordinates = (coords) => {
        if (!Array.isArray(coords)) return coords;

        if (typeof coords[0] === "number") {
          return [coords[0], coords[1]]; // Take only lon, lat
        }

        return coords.map((coord) => cleanCoordinates(coord));
      };

      let cleanedCoordinates;
      if (geoType === "multipolygon") {
        cleanedCoordinates = geometry.coordinates.map((polygon) =>
          polygon.map((ring) => cleanCoordinates(ring))
        );
      } else {
        cleanedCoordinates = geometry.coordinates.map((ring) =>
          cleanCoordinates(ring)
        );
      }

      // Create GeoJSON structure
      const geoJsonData = {
        type: "Feature",
        geometry: {
          type: geoType === "multipolygon" ? "MultiPolygon" : "Polygon",
          coordinates: cleanedCoordinates,
        },
        properties: {},
      };

      console.log("Created GeoJSON:", JSON.stringify(geoJsonData, null, 2));

      // Validate coordinates
      const validateCoordinates = (coords) => {
        if (!Array.isArray(coords)) return false;
        return coords.every((coord) => {
          if (Array.isArray(coord)) {
            if (typeof coord[0] === "number" && typeof coord[1] === "number") {
              return true;
            }
            return validateCoordinates(coord);
          }
          return false;
        });
      };

      if (!validateCoordinates(cleanedCoordinates)) {
        console.error("Invalid coordinates after cleaning");
        return;
      }

      const boundaryLayer = L.geoJSON(geoJsonData, {
        style: {
          color: "#ff7800",
          weight: 2,
          opacity: 0.65,
          fillOpacity: 0.2,
        },
      }).addTo(map);

      if (boundaryLayer.getBounds().isValid()) {
        map.fitBounds(boundaryLayer.getBounds(), {
          padding: [50, 50],
          maxZoom: 13,
        });
      }
    } catch (error) {
      console.error("Failed to draw boundary:", error);
      console.error("Invalid geom data:", JSON.stringify(geom, null, 2));
    }
  }, [map, geom]);

  return null;
};

const IndivisualProprtyMapStatic = ({
  height = "650px",
  center,
  floodZoneData,
  postcode,
  geom,
}) => {
  const zoom = 13;

  // Parse flood zone data to GeoJSON
  const floodZoneGeoJSON = floodZoneData
    ? parseFloodZoneData(floodZoneData)
    : null;

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
        <BoundaryLayer geom={geom} />

        <MarkersWithCustomIcon center={center} />
        {floodZoneGeoJSON && <FloodRiskOverlay floodData={floodZoneGeoJSON} />}
        <WMSLayer postcode={postcode} />
      </MapContainer>
    </div>
  );
};

export default IndivisualProprtyMapStatic;
