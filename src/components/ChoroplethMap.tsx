import L from "leaflet";
import { TileLayer, MapContainer, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useContext, useDebugValue, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppProvider";

import GeoJSON from "geojson";
import statesData from "../data/us_state.json";
import { updateSourceFile } from "typescript";

const getColor = (d: number): string => {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
};

const Legend = () => {
  let grades = [0, 10, 20, 50, 100, 200, 500, 1000];

  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control leaflet-bar info legend">
        {grades.map((grade, index) => {
          let grade_txt = `${grade}`;
          if (grades[index + 1]) grade_txt += `-${grades[index + 1]}`;
          else grade_txt += "+";

          return (
            <div className="grade" key={index}>
              <i style={{ background: getColor(grades[index + 1]) }}></i>
              {grade_txt}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Info = () => {
  const map = useMap();

  let info_div: HTMLDivElement;

  const [info, setInfo] = useState<{ name: string; density: string } | null>(
    null
  );

  const update = (props?: any) => {
    console.log(props);

    if (props) setInfo({ name: props.name, density: props.density });
    else setInfo(null);
  };

  const onAdd = (map?: L.Map) => {
    info_div = L.DomUtil.create("div", "info");
    update();
  };

  const InfoControl = L.Control.extend({
    onAdd: onAdd,
    update: update,
  });

  // get color depending on population density value

  const style = (feature: any) => {
    return {
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.density),
    };
  };

  function zoomToFeature(e: any) {
    map.fitBounds(e.target.getBounds());
  }

  useEffect(() => {
    const infoControl = new InfoControl();
    console.log("Render");

    infoControl.onAdd();

    const highlightFeature = (e: any) => {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      infoControl.update(layer.feature.properties);
    };

    let geoJson: L.GeoJSON<any>;

    const resetHighlight = (e: any) => {
      geoJson.resetStyle(e.target);
      infoControl.update();
    };

    const onEachFeature = (feature: any, layer: any) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    };

    const data = statesData as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

    geoJson = L.geoJSON(data, {
      style: style,
      onEachFeature: onEachFeature,
    });

    geoJson.addTo(map);
  }, [map]);

  return (
    <div className="leaflet-top leaflet-right">
      <div className="info leaflet-control leaflet-bar">
        <h4>US Population Density</h4>
        {info ? (
          <>
            <b> {info.name}</b>
            <br />
            {info.density} people / mi<sup>2</sup>
          </>
        ) : (
          <>Hover over a state</>
        )}
      </div>
    </div>
  );
};

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

export const ChoroplethMap = () => {
  //const ctx = useContext(AppContext);

  return (
    <MapContainer center={[37.8, -96]} maxZoom={19} zoom={4}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Info />
      <Legend />
    </MapContainer>
  );
};
