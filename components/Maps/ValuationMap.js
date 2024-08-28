"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "./MarkerCluster";
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

const ValuationMap = ({ height, center}) => {
    console.log("DisplayMap center", center);
    
  const initialCenter = center?.length > 0 ? center[0] : { lat: 0, lng: 0 };

  const zoom = 13;

  const customIcon = L.icon({
    iconUrl: "/icons/mapmarker.svg",
    iconSize: [32, 32],
  });
  

  const iconCreateFunction = (cluster) => {
    return L.divIcon({
      html: `<div style="background: #ff6347; color: #fff; border-radius: 50%; height: 32px; width: 32px; display: flex; align-items: center; justify-content: center;">${cluster.getChildCount()}</div>`,
      className: 'custom-cluster-icon',
    });
  };

  
  return (
    <div className="">
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
      
        <MarkerClusterGroup iconCreateFunction={iconCreateFunction}>
         
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default ValuationMap;
