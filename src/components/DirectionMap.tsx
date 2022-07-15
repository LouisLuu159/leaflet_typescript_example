import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap, MapContainer, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

export const DirectionMap = () => {
  return (
    <MapContainer center={[39.73, -104.99]} zoom={10} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <EventMap />
    </MapContainer>
  );
};

const EventMap = () => {
  const map = useMap();

  const routeControl = L.Routing.control({
    waypoints: [L.latLng(39.61, -105.02), L.latLng(39.74, -104.99)],
  });

  map.addControl(routeControl);

  const element = document.getElementsByClassName(
    "leaflet-routing-container leaflet-bar leaflet-control"
  );
  console.log(element.length);

  if (element.length > 1) {
    element[0].remove();
  }

  // const mapEvent = useMapEvents({
  //   contextmenu: (e) => {
  //     let popLocation = e.latlng;
  //     console.log(popLocation);
  //   },
  // });

  return null;
};
