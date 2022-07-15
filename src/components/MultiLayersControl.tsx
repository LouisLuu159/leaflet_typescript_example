import L from "leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { createRef, useEffect } from "react";

import {
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  TileLayer,
  LayerGroup,
  Circle,
  Rectangle,
  FeatureGroup,
  useMap,
} from "react-leaflet";

const center: LatLngTuple = [51.505, -0.09];
const rectangle: LatLngTuple[] = [
  [51.49, -0.08],
  [51.5, -0.06],
];

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

export const MultiLayersControl = () => {
  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.Overlay name="Marker with popup">
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Layer group with circles">
          <LayerGroup>
            <Circle
              center={center}
              pathOptions={{ fillColor: "blue" }}
              radius={200}
            />
            <Circle
              center={center}
              pathOptions={{ fillColor: "red" }}
              radius={100}
              stroke={false}
            />
            <LayerGroup>
              <Circle
                center={[51.51, -0.08]}
                pathOptions={{ color: "green", fillColor: "green" }}
                radius={100}
              />
            </LayerGroup>
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Feature group">
          <FeatureGroup pathOptions={{ color: "purple" }}>
            <Popup>Popup in FeatureGroup</Popup>
            <Circle center={[51.51, -0.06]} radius={200} />
            <Rectangle bounds={rectangle} />
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export const MultiMapLayersControl = () => {
  let streetMapAttr =
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
  let streetMapURL =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

  const citiesOrdinate: { ordinate: [number, number]; popup: string }[] = [
    { ordinate: [39.61, -105.02], popup: "This is Littleton, CO." },
    { ordinate: [39.74, -104.99], popup: "This is Denver, CO." },
    { ordinate: [39.73, -104.8], popup: "This is Aurora, CO." },
    { ordinate: [39.77, -105.23], popup: "This is Golden, CO." },
  ];

  const parksOrdinate: { ordinate: [number, number]; popup: string }[] = [
    { ordinate: [39.75, -105.09], popup: "This is Crown Hill Park." },
    { ordinate: [39.68, -105.0], popup: "This is Ruby Hill Park." },
  ];

  return (
    <MapContainer center={[39.73, -104.99]} zoom={10} scrollWheelZoom={false}>
      <EventMap />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Open Street Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Street">
          <TileLayer
            url={streetMapURL}
            id="mapbox/streets-v11"
            tileSize={512}
            zoomOffset={-1}
            attribution={streetMapAttr}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelite">
          <TileLayer
            url={streetMapURL}
            id="mapbox/satellite-v9"
            tileSize={512}
            zoomOffset={-1}
            attribution={streetMapAttr}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="Cities">
          <LayerGroup>
            {citiesOrdinate.map((city, index) => {
              return (
                <Marker position={city.ordinate} key={`city-${index}`}>
                  <Popup>{city.popup}</Popup>
                </Marker>
              );
            })}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Parks">
          <LayerGroup>
            {parksOrdinate.map((park, index) => {
              return (
                <Marker position={park.ordinate} key={`park-${index}`}>
                  <Popup>{park.popup}</Popup>
                </Marker>
              );
            })}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

const EventMap = () => {
  const map = useMap();
  map.on("contextmenu", function (e) {
    let popLocation = e.latlng;

    let popup = L.popup()
      .setLatLng(popLocation)
      .setContent("<p>Hello world!<br />This is a nice popup.</p>")
      .openOn(map);
  });
  return null;
};
