import dynamic from "next/dynamic";
 
export const SearchMap = dynamic(() => import("./SearchMap"), {
  ssr: false,
  loading: () => <p>A map is loading</p>,
});