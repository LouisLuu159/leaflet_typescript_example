import L from "leaflet";
import {
  TileLayer,
  FeatureGroup,
  MapContainer,
  useMap,
  Rectangle,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppProvider";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

export const LeafletMap = () => {
  const ctx = useContext(AppContext);

  let initEditableFG = new L.FeatureGroup<any>();
  const [editableFG, setEditableFG] = useState(initEditableFG);

  enum ShapeType {
    RECTANGLE = "rectangle",
    CIRCLE = "circle",
    MARKER = "marker",
    POLYGON = "polygon",
  }

  interface Item {
    latlngs: { lat: number; lng: number }[];
    type: ShapeType;
    mRadius?: number;
  }

  let initDrawnItems: {
    [id: string]: Item;
  } = {};
  const [drawnItems, setDrawnItems] = useState(initDrawnItems);

  const onCreated = (e: any) => {
    console.log(typeof e.layer);

    const layer = e.layer;
    editableFG.addLayer(e.layer);

    console.log(Object.keys(e));
    console.log(layer);

    const layerType = e.layerType;
    let item: Item = { latlngs: [], type: ShapeType.RECTANGLE };

    switch (layerType) {
      case ShapeType.POLYGON: {
        item.type = ShapeType.POLYGON;
        item.latlngs = layer._latlngs[0];
        break;
      }

      case ShapeType.RECTANGLE: {
        item.type = ShapeType.RECTANGLE;
        item.latlngs = layer._latlngs[0];
        break;
      }

      case ShapeType.CIRCLE: {
        item.mRadius = layer._mRadius;
        item.type = ShapeType.CIRCLE;
        item.latlngs = [layer._latlng];
        break;
      }

      case ShapeType.MARKER: {
        item.type = ShapeType.MARKER;
        item.latlngs = [layer._latlng];
        break;
      }
    }
    drawnItems[layer._leaflet_id] = item;
    console.log(JSON.stringify(drawnItems));
    setDrawnItems(drawnItems);

    // drawnItems[layer._leaflet_id] = layer._latlngs[0];

    // editableFG.addLayer(e.layer);

    // console.log("Created");
    // const layers = editableFG.getLayers();
    // console.log(layers);

    // layers.forEach((layer: any) => {
    //   //   console.log(Object.keys(layer));
    //   //   console.log(layer._latlngs);
    //   //   drawnItems[layer._leaflet_id] = layer._latlngs[0];
    // });
    // console.log(JSON.stringify(drawnItems));
  };

  const onFeatureGroupReady = (reactFGref: any) => {
    setEditableFG(reactFGref);
  };

  const onEditStart = () => {
    console.log("Edit");
  };

  const onEdited = () => {
    console.log("Save");
  };

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
      <FeatureGroup
        ref={(featureGroupRef) => {
          onFeatureGroupReady(featureGroupRef);
        }}
      >
        <EditControl
          position="topright"
          draw={{ circlemarker: false }}
          onCreated={onCreated}
          onEditStart={onEditStart}
          onEdited={onEdited}
        />
      </FeatureGroup>
    </MapContainer>
  );
};
