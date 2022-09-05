import React from "react";
import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <Router>
          <Routes>
            <Route path="/" element={<LeafletMap />} />
            <Route path="/choropleth" element={<ChoroplethMap />} />
            <Route path="/tooltip" element={<MapWithTooltipPopup />} />
            <Route path="/multi_layer*" element={<MultiLayersControl />} />
            <Route path="/multi_map" element={<MultiMapLayersControl />} />
          </Routes>
        </Router>
        {/* <ChoroplethMap /> */}
        {/* <MapWithTooltipPopup /> */}
        {/* <MultiMapLayersControl /> */}
        {/* <MultiLayersControl /> */}
        {/* <LeafletMap /> */}
      </div>
    </AppProvider>
  );
}

export default App;
