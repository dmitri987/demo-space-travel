import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home/HomePage";
import DestinationPage from "./components/Destination/DestinationPage";
import CrewPage from "./components/Crew/CrewPage";
import TechnologyPage from "./components/Technology/TechnologyPage";
import ProjectInfo from "./components/ProjectInfo/ProjectInfo";
import { subscribeViewportWidthObserver, preload } from "./helpers";
import "./App.css";
import data from "./data.json";

const { desktop, tablet } = data.breakpoints;
const ASSETS_DIR = "assets";
// const hasWebp = await isWebpSupported();

function App({ isWebpSupported }) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    return subscribeViewportWidthObserver(setViewportWidth);
  }, []);

  const size =
    viewportWidth <= tablet
      ? "mobile"
      : viewportWidth <= desktop
      ? "tablet"
      : "desktop";

  const sizeNoMobile = size === "mobile" ? "tablet" : size;
  const ext = (defaultExtension) =>
    isWebpSupported ? "webp" : defaultExtension;

  preload(
    [
      `${ASSETS_DIR}/home/bg-home-${size}.${ext("jpg")}`,
      `${ASSETS_DIR}/destination/bg-destination-${size}.${ext("jpg")}`,
      `${ASSETS_DIR}/crew/bg-crew-${size}.${ext("jpg")}`,
      `${ASSETS_DIR}/technology/bg-technology-${size}.${ext("jpg")}`,
      `${ASSETS_DIR}/destination/moon.${ext("png")}`,
      `${ASSETS_DIR}/crew/douglas-hurley.${ext("png")}`,
      `${ASSETS_DIR}/technology/launch-vehicle-${sizeNoMobile}.${ext("jpg")}`,
    ],
    1000
  );

  return (
    <div className="App">
      <ProjectInfo />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/destination" element={<DestinationPage />} />
        <Route path="/crew" element={<CrewPage />} />
        <Route
          path="/technology"
          element={<TechnologyPage viewportWidth={viewportWidth} />}
        />
      </Routes>
    </div>
  );
}

export default App;
