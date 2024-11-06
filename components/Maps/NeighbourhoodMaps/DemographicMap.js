"use client";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "../MarkerCluster";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet-gesture-handling"

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

const MarkersWithCustomIcon = ({ center }) => {
  const map = useMap();

  const customIcon = L.icon({
    iconUrl: "/icons/mapmarker.svg",
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

const Demographic = ({ height, center = [] }) => {    
  const initialCenter = center?.length > 0 ? center[0] : { lat: 0, lng: 0 };
  const zoom = 13;

  const iconCreateFunction = (cluster) => {
    return L.divIcon({
      html: `<div style="background: #ff6347; color: #fff; border-radius: 50%; height: 32px; width: 32px; display: flex; align-items: center; justify-content: center;">${cluster.getChildCount()}</div>`,
      className: 'custom-cluster-icon',
    });
  };

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
        gestureHandling={true}
      >
        <MapTilerLayerComponent />
        <MarkerClusterGroup iconCreateFunction={iconCreateFunction}>
          <MarkersWithCustomIcon center={center} />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Demographic;
