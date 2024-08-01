'use client';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Maps = ({ height, center }) => {
    console.log("center", center);
  const zoom = 13;
 
  // Create a custom icon with a custom size
  const customIcon = L.icon({
    iconUrl: "/icons/mapmarker.svg", 
    iconSize: [32, 32], 
  });

  return (
    <div className="rounded-md">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        style={{
          width: "100%",
          height: `${height ? height : "650px"} `,
        }}
      >
        <TileLayer
          // url={osm.maptiler.url}
          // attribution={osm.maptiler.attribution}
          
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        />
        <Marker position={[center.lat, center.lng]} icon={customIcon}>
          <Popup>This is a marker</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
