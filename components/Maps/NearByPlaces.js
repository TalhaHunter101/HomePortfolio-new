"use client";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet-gesture-handling";
import useNearByStore from "@/store/newarbyStore";

const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: "685vx5hNgMMOFvoFvLAX",
      style: "basic-v2-light",
      filter: ["grayscale:100", "contrast:100", "brightness:100"],
    }).addTo(map);

    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map]);

  return null;
};

const BoundaryLayer = ({ geom }) => {
  const map = useMap();

  useEffect(() => {
    if (!geom) {
      console.log("No geometry provided");
      return;
    }

    let geometryData;
    if (typeof geom === 'string') {
      try {
        geometryData = JSON.parse(geom);
      } catch (e) {
        console.error("Failed to parse geom string:", e);
        return;
      }
    } else {
      geometryData = geom;
    }

    try {
      const geoJsonData = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: geometryData.coordinates || geometryData,
        },
        properties: {},
      };

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
    }
  }, [map, geom]);

  return null;
};

const MarkersWithCustomIcon = ({ center, locations, selectedAmenity, amenities }) => {
  const map = useMap();
  const { selecteNearbyLocation } = useNearByStore();

  useEffect(() => {
    const centerPoint = selecteNearbyLocation 
      ? [selecteNearbyLocation.lat, selecteNearbyLocation.lon]
      : [center.lat, center.lng];
      
    map.setView(centerPoint, 16);
  }, [center.lat, center.lng, selecteNearbyLocation, map]);

  const selectedAmenityDetails = amenities.find(a => a.key === selectedAmenity);

  return (
    <>
      <Marker
        position={[center.lat, center.lng]}
        icon={L.icon({
          iconUrl: "/icons/mapmarker.svg",
          iconSize: [32, 32],
        })}
      />
      {locations?.map((location, index) => (
        <Marker
          key={index}
          position={[location?.lat, location?.lon]}
          icon={L.icon({
            iconUrl: `/icons/nearbyicon/${selectedAmenityDetails?.icon_name}.svg`, 
            iconSize: [32, 32],
          })}
        />
      ))}
    </>
  );
};

const NearByPlacesMap = ({ 
  height = "650px", 
  center, 
  locations, 
  amenities, 
  selectedAmenity,
  geom
}) => {
  const zoom = 13;

  return (
    <div>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        maxZoom={28}
        minZoom={1}
        style={{
          width: "100%",
          height: height,
        }}
        gestureHandling={true}
      >
        <MapTilerLayerComponent />
        <BoundaryLayer geom={geom} />
        <MarkersWithCustomIcon 
          center={center} 
          locations={locations} 
          amenities={amenities} 
          selectedAmenity={selectedAmenity}
        />
      </MapContainer>
    </div>
  );
};

export default NearByPlacesMap;