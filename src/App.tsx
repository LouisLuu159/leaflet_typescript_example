import React from "react";
import "./App.css";
import { ChoroplethMap } from "./components/ChoroplethMap";
import { LeafletMap } from "./components/LeafletMap";
import { MapWithTooltipPopup } from "./components/MapWithTooltipPopUp";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <MapWithTooltipPopup />
      </div>
    </AppProvider>
  );
}

export default App;
