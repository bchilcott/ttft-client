import { divIcon } from 'leaflet';
import { useEffect } from 'react';
import { LayerGroup, Marker, useMapEvents } from 'react-leaflet';
import { PlacementMode } from '~/components/Map/MapActions';
import { useContacts, useCreateContact } from '~/hooks/contacts';
import ms from 'milsymbol';

import useContactsStore from '~/hooks/useContactsStore';
import { Environment, CreateContactDto } from '~/types/Contact';

const thing = new ms.Symbol('SFGP------------', { size: 25 });

function createContact(
  position: [number, number],
  environment: Environment
): CreateContactDto {
  return {
    name: 'Test',
    type: 'HELLO',
    systemId: 'CHALLENGER',
    environment: environment,
    course: Math.random() * 360,
    speed: 100,
    speedUnit: 'MPH',
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
      altitudeUnit: 'FT_AMSL',
    },
  };
}

export type MarkersLayerProps = {
  placementMode: PlacementMode;
  onContactCreated?: (contact: CreateContactDto) => void;
};

export default function MarkersLayer(props: MarkersLayerProps) {
  const { selectOne } = useContactsStore((state) => state);
  const mutation = useCreateContact();
  const { data: contacts } = useContacts();

  useEffect(() => {
    if (mutation.isSuccess) {
      selectOne(mutation.data.trackId);
    }
  }, [mutation.isSuccess, mutation.data, selectOne]);

  useMapEvents({
    click: (e) => {
      if (props.placementMode === 'NONE') return;
      const contact = createContact(
        [e.latlng.lat, e.latlng.lng],
        props.placementMode
      );
      mutation.mutate(contact);
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
            icon={divIcon({ html: thing.asSVG(), className: 'marker' })}
            eventHandlers={{
              click: () => selectOne(contact.trackId),
            }}
          />
        ))}
    </LayerGroup>
  );
}
