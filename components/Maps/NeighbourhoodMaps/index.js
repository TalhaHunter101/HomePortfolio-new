import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
 
export const DemograpicMapStatic = dynamic(() => import("./DemographicMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex justify-center items-center"><Spinner label="Map is loading" size="sm" /></div>,
});