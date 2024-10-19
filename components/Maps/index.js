import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
 
export const SearchMap = dynamic(() => import("./SearchMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
});

export const ValuationMapStatic = dynamic(() => import("./ValuationMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
});

export const IndivisualProprtyMapStatic = dynamic(() => import("./IndivisualProprtyMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})

export const SchoolMapStatic = dynamic(() => import("./SchoolMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})

export const NearByPlacesStatic = dynamic(() => import("./NearByPlaces"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})


export const TransportMapStatic = dynamic(() => import("./TransportMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})


export const PlanningApplicationMapStatic = dynamic(() => import("./PlanningApplicationMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})


export const EvChargingMapStatic = dynamic(() => import("./EvChargingMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})

export const BusMapStatic = dynamic(() => import("./TransportMaps/BusMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})


export const RecentlySoldMapsStatic = dynamic(() => import("./RecentlySoldMaps"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})


export const FloodMapMapsStatic = dynamic(() => import("./Flood/FloodMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
})