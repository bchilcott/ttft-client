import { Icon, icon } from 'leaflet';
import { useEffect } from 'react';
import { LayerGroup, Marker, useMapEvents } from 'react-leaflet';
import { PlacementMode } from '~/components/Map/MapActions';

import useContactsStore from '~/hooks/useContactsStore';
import Contact, { Environment } from '~/types/Contact';
import { updateContactPosition } from '~/utils/contactUtils';

const ICON_RED = icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ICON_GREEN = icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ICON_BLUE = icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function createContact(
  position: [number, number],
  environment: Environment
): Contact {
  return {
    name: 'Test',
    dataSource: 'TTFT',
    trackID: Math.random().toString(36).substr(2, 9).toUpperCase(),
    type: 'HELLO',
    systemID: 'CHALLENGER',
    environment: environment,
    course: Math.random() * 360,
    speed: 100,
    speedUnit: 'MPH',
    stale: false,
    operation: 'NEW',
    attitude: {
      pitch: 0,
      roll: 0,
      yaw: 0,
    },
    position: {
      latitude: position[0],
      longitude: position[1],
      altitude: 0,
      altitudeUnit: 'FT AMSL',
    },
  };
}

function getIcon(environment: Environment): Icon {
  switch (environment) {
    case 'AIR':
      return ICON_RED;
    case 'LAND':
      return ICON_GREEN;
    case 'SURFACE':
      return ICON_BLUE;
    default:
      return ICON_RED;
  }
}

export type MarkersLayerProps = {
  placementMode: PlacementMode;
  onContactCreated?: (contact: Contact) => void;
};

const PERIOD_IN_SECONDS = 1;

export default function MarkersLayer(props: MarkersLayerProps) {
  const { contacts, add, setAll, selectOne } = useContactsStore(
    (state) => state
  );

  useEffect(() => {
    const int = setInterval(() => {
      const updated = contacts.map((contact) =>
        updateContactPosition(contact, PERIOD_IN_SECONDS)
      );
      setAll(updated);
      // TODO: POST to some ACE endpoint
    }, 1000 * PERIOD_IN_SECONDS);

    return () => clearInterval(int);
  }, [contacts, setAll]);

  useMapEvents({
    click: (e) => {
      if (props.placementMode === 'NONE') return;
      const contact = createContact(
        [e.latlng.lat, e.latlng.lng],
        props.placementMode
      );
      add(contact);
      props.onContactCreated?.(contact);
    },
  });

  return (
    <LayerGroup>
      {contacts &&
        contacts.map((contact, index) => (
          <Marker
            key={index}
            position={[contact.position.latitude, contact.position.longitude]}
            icon={getIcon(contact.environment)}
            eventHandlers={{
              click: () => selectOne(contact.trackID),
            }}
          />
        ))}
    </LayerGroup>
  );
}
