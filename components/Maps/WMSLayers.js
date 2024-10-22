import { WMSTileLayer } from "react-leaflet";
import { memo } from "react";

const geoserver = {
  baseUrl: process.env.NEXT_PUBLIC_GEOSERVER_URL + "wms",
  workspace: "home-portfolio",
  layerName: "Uk_Postcodes_LayerGroup",
};

const WMSLayer = memo(({ postcode }) => {
  let postCode = postcode.slice(0, -2); // Slice to remove the last two characters

  let CQL_FILTER = `Name='${postCode}'`;
  console.log("cql", CQL_FILTER);

  return (
    <WMSTileLayer
      url={geoserver.baseUrl}
      version="1.0.0"
      layers={geoserver.workspace + ":" + geoserver.layerName}
      transparent="true"
      format="image/png"
      params={{
        ...(CQL_FILTER && { CQL_FILTER }),
      }}
      zIndex={99}
    />
  );
});

WMSLayer.displayName = 'WMSLayer';

export default WMSLayer;