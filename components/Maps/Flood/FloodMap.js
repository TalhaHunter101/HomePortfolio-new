import React, { useEffect } from 'react';
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import L from 'leaflet';

// MapTiler layer component
const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: '685vx5hNgMMOFvoFvLAX',
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
    color: '#3388ff',
    weight: 2,
    fillColor: '#3388ff',
    fillOpacity: 0.4,
  };
};

const FloodMap = ({ floodAreas ,height}) => {
  return (
    <MapContainer
      center={[53.2, -0.55]} // Adjust this based on your region
      zoom={10}
      style={{
          width: "100%",
          height: `${height ? height : "650px"} `,
        }} 
    >
      {/* MapTiler Layer */}
      <MapTilerLayerComponent />

      {floodAreas.map((polygon, index) => (
        <GeoJSON key={index} data={polygon} style={polygonStyle} />
      ))}
    </MapContainer>
  );
};

export default FloodMap;
