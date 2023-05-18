import { useAtom, useSetAtom } from "jotai";
import { Icon, icon } from "leaflet";
import { LayerGroup, Marker, Popup, useMapEvents } from "react-leaflet";
import placementModeAtom from "~/state/jotai/placementModeAtom";
import selectedContactAtom from "~/state/jotai/selectedContactAtom";
import useContactsStore from "~/state/zustand/useContactsStore";
import Contact from "~/types/Contact";
import { Environment } from "~/types/Contact";

const ICON_RED = icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ICON_GREEN = icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ICON_BLUE = icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function createContact(
  position: [number, number],
  environment: Environment
): Contact {
  return {
    name: "Test",
    dataSource: "TTFT",
    trackID: Math.random().toString(36),
    type: "HELLO",
    systemID: "CHALLENGER",
    environment: environment,
    course: 0,
    speed: 0,
    speedUnit: "MPH",
    stale: false,
    operation: "NEW",
    attitude: {
      pitch: 0,
      roll: 0,
      yaw: 0,
    },
    position: {
      latitude: position[0],
      longitude: position[1],
      altitude: 0,
      altitudeUnit: "FT AMSL",
    },
  };
}

function getIcon(environment: Environment): Icon {
  switch (environment) {
    case "AIR":
      return ICON_RED;
    case "LAND":
      return ICON_GREEN;
    case "SURFACE":
      return ICON_BLUE;
    default:
      return ICON_RED;
  }
}

export default function MarkersLayer() {
  const contacts = useContactsStore((state) => state.contacts);
  const add = useContactsStore((state) => state.add);
  const [placementMode, setPlacementMode] = useAtom(placementModeAtom);
  const setSelectedContact = useSetAtom(selectedContactAtom);

  useMapEvents({
    click: (e) => {
      if (placementMode === "NONE") return;
      add(createContact([e.latlng.lat, e.latlng.lng], placementMode));
      setPlacementMode("NONE");
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
              click: () => {
                console.log(contact);
                setSelectedContact(contact);
              },
            }}
          >
            <Popup>{contact.trackID}</Popup>
          </Marker>
        ))}
    </LayerGroup>
  );
}
