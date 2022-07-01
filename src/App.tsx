import React from "react";
import "./App.css";
import { LeafletMap } from "./components/LeafletMap";
import { AppProvider } from "./context/AppProvider";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <LeafletMap />
      </div>
    </AppProvider>
  );
}

export default App;
