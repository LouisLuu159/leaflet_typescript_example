import React from "react";
import "./App.css";
import { ChoroplethMap } from "./components/ChoroplethMap";
import { DirectionMap } from "./components/DirectionMap";
import { LeafletMap } from "./components/LeafletMap";
import { MapWithTooltipPopup } from "./components/MapWithTooltipPopUp";
import {
  MultiLayersControl,
  MultiMapLayersControl,
} from "./components/MultiLayersControl";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <div className="App">
        {/* <ChoroplethMap /> */}
        {/* <MapWithTooltipPopup /> */}
        {/* <MultiMapLayersControl /> */}
        {/* <MultiLayersControl /> */}
        <LeafletMap />
      </div>
    </AppProvider>
  );
}

export default App;
