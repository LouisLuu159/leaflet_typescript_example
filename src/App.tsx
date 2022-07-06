import React from "react";
import "./App.css";
import { ChoroplethMap } from "./components/ChoroplethMap";
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
        <MultiMapLayersControl />
      </div>
    </AppProvider>
  );
}

export default App;
