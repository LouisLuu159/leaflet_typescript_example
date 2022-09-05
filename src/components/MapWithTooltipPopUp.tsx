import { LatLngExpression, LatLngTuple } from "leaflet";
import { useMemo, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  Popup,
  Polygon,
  Rectangle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // keep in mind that have to include this
import L from "leaflet";
import Logo from "../logo.svg";

const center: LatLngExpression = [51.505, -0.09];

const multiPolygon: LatLngExpression[][] = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
];

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

const TooltipCircle = () => {
  const [clickedCount, setClickedCount] = useState(0);
  const eventHandlers = useMemo(
    () => ({
      click() {
        setClickedCount((count) => count + 1);
      },
    }),
    []
  );

  const clickedText =
    clickedCount === 0
      ? "Click this Circle to change the Tooltip text"
      : `Circle click: ${clickedCount}`;

  return (
    <Circle
      center={center}
      eventHandlers={eventHandlers}
      pathOptions={{ fillColor: "blue" }}
      radius={200}
    >
      <Tooltip>{clickedText}</Tooltip>
    </Circle>
  );
};

export const MapWithTooltipPopup = () => {
  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TooltipCircle />
      <CircleMarker
        center={[51.51, -0.12]}
        pathOptions={{ color: "red" }}
        radius={20}
      >
        <Tooltip>Tooltip for CircleMarker</Tooltip>
      </CircleMarker>
      <Marker position={[51.51, -0.09]}>
        <Popup>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Love-game-logo-256x256.png"
            style={{
              height: "64px",
              width: "64px",
              objectFit: "contain",
              paddingLeft: "5px",
            }}
          ></img>
          <div>This is PopUp</div>
          <button
            onClick={() => {
              console.log("Click");
            }}
          >
            Click Me
          </button>
        </Popup>

        <Tooltip>Tooltip for Marker</Tooltip>
      </Marker>
      <Polygon pathOptions={{ color: "purple" }} positions={multiPolygon}>
        <Popup>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Love-game-logo-256x256.png"
            style={{
              height: "64px",
              width: "64px",
              objectFit: "contain",
              paddingLeft: "5px",
            }}
          ></img>
          <div>This is PopUp</div>
          <button
            onClick={() => {
              console.log("Click");
            }}
          >
            Click Me
          </button>
        </Popup>
      </Polygon>
      <Rectangle bounds={rectangle} pathOptions={{ color: "black" }}>
        <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Love-game-logo-256x256.png"
            style={{
              height: "64px",
              width: "64px",
              objectFit: "contain",
              paddingLeft: "5px",
            }}
          ></img>
          <div>This is image</div>
        </Tooltip>
      </Rectangle>
    </MapContainer>
  );
};
