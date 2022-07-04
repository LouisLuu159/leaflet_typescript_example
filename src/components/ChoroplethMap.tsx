import { useContext } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { AppContext } from "../context/AppProvider";
import stateData from "../data/us_state.json";
import { Control, DomUtil } from "leaflet";
import L from 'leaflet';

export const ChoroplethMap = () => {
  const map = useMap();

  const ctx = useContext(AppContext);

//   L.Control.Watermark = Control.extend({
//     onAdd: function (map) {
//       const img = DomUtil.create("img");
//       img.src = "./logo.png";
//       img.style.width = "200px";
//       return img;
//     },

//     onRemove: function (map) {},
//   });

  return (
    <MapContainer
      center={ctx?.center}
      zoom={ctx?.zoomLevel}
      minZoom={ctx?.minZoom}
      maxZoom={ctx?.maxZoom}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
