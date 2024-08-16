"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "./MarkerCluster";
import { Chip, Image } from "@nextui-org/react";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { formatPrice } from "@/utils/Helper";


const MapEventsHandler = ({ setVisibleCenters, centers }) => {
  const map = useMapEvent({
    zoomend: () => {
      updateVisibleCenters();
    },
    moveend: () => {
      updateVisibleCenters();
    },
  });

  const updateVisibleCenters = () => {
    const bounds = map.getBounds();
    const visibleCenters = centers?.filter((center) =>
      bounds.contains([center.lat, center.lng])
    );
    setVisibleCenters(visibleCenters);
  };

  return null;
};



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

const Maps = ({ height, center, hovercard,setfilter }) => {
  const [likedItems, setLikedItems] = useState({});
  const [visibleCenters, setVisibleCenters] = useState(center);
  const initialCenter = center?.length > 0 ? center[0] : { lat: 0, lng: 0 };
  if (setfilter) {
    setfilter(visibleCenters);
  }

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

  const marketComponents = useMemo(() => {
    return center?.map((center, index) => {
      const priceIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div class="min-w-max translate-x-2/4 -translate-y-full flex flex-col items-center relative drop-shadow-xl ">
          <button class="shadow rounded-full h-auto px-2 text-1.5xs py-2  bg-white hover:bg-white-100 text-black font-semibold ${
            hovercard === center.id && "border-4 border-primary"
          }">
          £${formatPrice(center.minPrice)}</button>
          <div class="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-white m-auto bg-transparent border-white"></div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      return (
        <Marker
          key={index}
          position={[center.lat, center.lng]}
          icon={priceIcon}
        >
          <Popup className="custom-popup">
            <div
              key={index}
              style={{ margin: "0" }}
              className="w-full flex flex-col shadow-cardShadow border rounded-lg overflow-hidden text-sm relative bg-white"
            >
              <div className="w-full relative cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105">
                <img
                  src={center?.images[0]}
                  className="h-52 w-full"
                  alt={center?.development_name}
                />
                <img
                  className="h-14 w-20 absolute bottom-0 right-0"
                  src={center?.developer_logo}
                />
              </div>
              <div className="w-full px-3 py-3">
                <div className="flex flex-col md:flex-row justify-between font-semibold text-primaryfonts">
                  <h2 className="text-lg">£{center?.minPrice}</h2>
                </div>
                <div className="flex items-center my-2">
                  5 beds . 3 baths. 2,452 sqft . House for sale
                </div>
                <div className="flex gap-x-5 my-3">
                  <div className="flex items-center">
                    <Image
                      src="/images/locationIcon.svg"
                      height={20}
                      width={20}
                      alt={center.development_address}
                    />
                    <p className="ml-2 font-semibold text-primaryfonts text-sm">
                      {center?.development_address}, {center?.postcode}
                    </p>
                  </div>
                </div>
                <Chip color="primary">Primary</Chip>
              </div>
            </div>
          </Popup>
        </Marker>
      );
    });
  }, [visibleCenters, hovercard]);

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
        {/* <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        /> */}

        <MapTilerLayerComponent />
        <MapEventsHandler
          setVisibleCenters={setVisibleCenters}
          centers={center}
        />
        <MarkerClusterGroup iconCreateFunction={iconCreateFunction}>
          {marketComponents}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Maps;
