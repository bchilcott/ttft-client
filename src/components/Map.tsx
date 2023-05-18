import { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkersLayer from "~/components/MarkersLayer";

export type LeafletMapProps = {
  onLoad?: (map: Map) => void;
};

export default function LeafletMap(props: LeafletMapProps) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ backgroundColor: "#222222", height: "100%", width: "100%" }}
      zoomControl={false}
      attributionControl={false}
      ref={props.onLoad}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <MarkersLayer />
    </MapContainer>
  );
}
