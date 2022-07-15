import L, { LatLngTuple } from "leaflet";
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
import {
  createRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AppContext } from "../context/AppProvider";
import { getGeoJson } from "../services/getData";
import GeoJSON from "geojson";

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

  const featureGroup = createRef<L.FeatureGroup<any>>();

  enum ShapeType {
    RECTANGLE = "rectangle",
    CIRCLE = "circle",
    MARKER = "marker",
    POLYGON = "polygon",
    POLYLINE = "polyline",
  }

  let initGeoJson: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
    type: "FeatureCollection",
    features: [],
  };
  const [geoJson, setGeoJson] = useState(initGeoJson);

  const onCreated = (e: any) => {
    const layer = e.layer;

    // console.log(featureGroup!.current);
    if (featureGroup!.current) featureGroup!.current!.addLayer(layer);

    let feature: GeoJSON.Feature<GeoJSON.Geometry> = {
      type: "Feature",
      id: layer._leaflet_id,
      properties: {},
      geometry: { type: "Polygon", coordinates: [] },
    };

    const layerType = e.layerType;
    switch (layerType) {
      case ShapeType.POLYGON: {
        let coordinates: number[][];
        coordinates = layer._latlngs[0].map(
          (ordinate: { lat: number; lng: number }) => {
            return [ordinate.lat, ordinate.lng];
          }
        );
        feature.geometry = { type: "Polygon", coordinates: [coordinates] };
        break;
      }

      case ShapeType.RECTANGLE: {
        let coordinates: number[][];
        coordinates = layer._latlngs[0].map(
          (ordinate: { lat: number; lng: number }) => {
            return [ordinate.lat, ordinate.lng];
          }
        );

        const firstOrdinate = layer._latlngs[0][0];
        coordinates.push([firstOrdinate.lat, firstOrdinate.lng]);

        feature.geometry = { type: "Polygon", coordinates: [coordinates] };
        break;
      }

      case ShapeType.CIRCLE: {
        feature.properties = { radius: layer._mRadius };
        const centerOrdinate = [layer._latlng.lat, layer._latlng.lng];
        feature.geometry = { type: "Point", coordinates: centerOrdinate };
        break;
      }

      case ShapeType.MARKER: {
        const centerOrdinate = [layer._latlng.lat, layer._latlng.lng];
        feature.geometry = { type: "Point", coordinates: centerOrdinate };
        break;
      }

      case ShapeType.POLYLINE: {
        const ordinates: number[][] = layer._latlngs.map(
          (ordinate: { lat: number; lng: number }) => {
            return Object.values(ordinate);
          }
        );
        feature.geometry = { type: "LineString", coordinates: ordinates };
        break;
      }
    }

    //console.log(feature);
    geoJson.features.push(feature);
  };

  const onEditStart = () => {
    console.log("Edit");
  };

  const onEdited = () => {
    console.log(featureGroup!.current?.getLayers());
    console.log("Save");
    console.log(JSON.stringify(geoJson));
    ctx?.setGeoJsonData(geoJson);
    featureGroup!.current?.clearLayers();
    setGeoJson(initGeoJson);

    //featureGroup!.current!.clearLayers();
    // const newFG = new L.FeatureGroup<any>();
    // setEditableFG(newFG);
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
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={featureGroup}>
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
