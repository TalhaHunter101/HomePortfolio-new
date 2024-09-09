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
    iconUrl: "/icons/busicon.svg",
    iconSize: [32, 32],
  });

  useEffect(() => {
    if (center.length > 0) {
      const bounds = L.latLngBounds(center.map(c => [c.lat, c.lng]));
      map.fitBounds(bounds, { maxZoom: 16 });
    }
  }, [map, center]);

  return (
    <>
      {center.map((location, index) => (
        <Marker
          key={index}
          position={[location.lat, location.lng]}
          icon={customIcon}
        />
      ))}
    </>
  );
};

const BusMap = ({ height, center = [] }) => {    
  const initialCenter = center?.length > 0 ? center[0] : { lat: 0, lng: 0 };
  const zoom = 22;

  return (
    <div>
      <MapContainer
        center={[initialCenter.lat, initialCenter.lng]}
        zoom={zoom}
        maxZoom={28}
        minZoom={1}
        style={{
          width: "100%",
          height: `${height ? height : "650px"} `,
        }} 
      >
        <MapTilerLayerComponent />
        <MarkersWithCustomIcon center={center} />
      </MapContainer>
    </div>
  );
};

export default BusMap;
