import { Map } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { forwardRef, useState, Ref } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import MapActions, { PlacementMode } from '~/components/MapActions';
import MarkersLayer from '~/components/MarkersLayer';

const LeafletMap = forwardRef((_props, ref: Ref<Map>) => {
  const [placementMode, setPlacementMode] = useState<PlacementMode>('NONE');

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{
          backgroundColor: '#222222',
          height: '100%',
          width: '100%',
          cursor: placementMode === 'NONE' ? 'grab' : 'crosshair',
        }}
        zoomControl={false}
        attributionControl={false}
        ref={ref}
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
    </>
  );
});

LeafletMap.displayName = 'LeafletMap';
export default LeafletMap;
