import { Map } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { forwardRef, useState, Ref } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapActions, { PlacementMode } from './MapActions';
import MarkersLayer from './MarkersLayer';
import { Box } from '@mui/material';

type LeafletMapProps = {
  onLoad?: (map: Map) => void;
  actionOffset?: number;
};

const LeafletMap = forwardRef((props: LeafletMapProps, _ref: Ref<Map>) => {
  const [placementMode, setPlacementMode] = useState<PlacementMode>('NONE');

  return (
    <Box sx={{ height: '100%' }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{
          backgroundColor: '#222222',
          height: '100%',
          width: '100%',
        }}
        zoomControl={false}
        attributionControl={false}
        ref={props.onLoad}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <MarkersLayer
          onContactCreated={() => setPlacementMode('NONE')}
          placementMode={placementMode}
        />
      </MapContainer>
      <MapActions onSelect={setPlacementMode} />
    </Box>
  );
});

LeafletMap.displayName = 'LeafletMap';
export default LeafletMap;
