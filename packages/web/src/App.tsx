import React from "react";
import "./App.module.scss";
import { useResponsiveSetup } from "./features/responsive/useResponsiveSetup";
import Navigation from "./components/Navigation/Navigation";

function App() {
  useResponsiveSetup();

  return (
    <div className="App">
      <Navigation />
    </div>
  );
}

export default App;
