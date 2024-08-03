import 'leaflet.markercluster';
import { createPathComponent } from '@react-leaflet/core';
import L from 'leaflet';

const MarkerClusterGroup = createPathComponent(({ children: _c, iconCreateFunction, ...props }, ctx) => {
  const clusterProps = { iconCreateFunction };
  const clusterEvents = {};

  Object.entries(props).forEach(([propName, prop]) => {
    if (propName.startsWith('on')) {
      clusterEvents[propName] = prop;
    } else {
      clusterProps[propName] = prop;
    }
  });

  const markerClusterGroup = L.markerClusterGroup(clusterProps);

  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
    markerClusterGroup.on(clusterEvent, callback);
  });

  return {
    instance: markerClusterGroup,
    context: { ...ctx, layerContainer: markerClusterGroup },
  };
});

export default MarkerClusterGroup;
