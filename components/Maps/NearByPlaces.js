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
  selectedAmenity
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