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

const MarkersWithCustomIcon = ({ center, locations, amenities }) => {
  const map = useMap();

  useEffect(() => {
    if (center?.lat && center?.lng) {
      map.setView([center.lat, center.lng], 16);
    }
  }, [center.lat, center.lng, map]);


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
            iconUrl: "/icons/mapmarker.svg",
            iconSize: [32, 32],
          })}        />
      ))}
    </>
  );
};

const NearByPlacesMap = ({ height = "650px", center, locations, amenities }) => {
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
      >
        <MapTilerLayerComponent />
        <MarkersWithCustomIcon center={center} locations={locations} amenities={amenities} />
      </MapContainer>
    </div>
  );
};

export default NearByPlacesMap;