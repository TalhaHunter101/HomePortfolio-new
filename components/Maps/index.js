import dynamic from "next/dynamic";
 
export const SearchMap = dynamic(() => import("./SearchMap"), {
  ssr: false,
  loading: () => <p>A map is loading</p>,
});

export const ValuationMapStatic = dynamic(() => import("./ValuationMap"), {
  ssr: false,
  loading: () => <p>A map is loading</p>,
});

export const IndivisualProprtyMapStatic = dynamic(() => import("./IndivisualProprtyMap"), {
  ssr: false,
  loading: () => <p>A map is loading</p>,
})

export const SchoolMapStatic = dynamic(() => import("./SchoolMap"), {
  ssr: false,
  loading: () => <p>A map is loading</p>,
})


export const TransportMapStatic = dynamic(() => import("./TransportMap"), {
  ssr: false,
  loading: () => <p>A map is loading</p>,
})