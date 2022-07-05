import React from "react";
import "./App.css";
import { ChoroplethMap } from "./components/ChoroplethMap";
// import { LeafletMap } from "./components/LeafletMap";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <ChoroplethMap />
      </div>
    </AppProvider>
  );
}

export default App;
