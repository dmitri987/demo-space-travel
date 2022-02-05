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
const { assetsDir } = data;
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

  useEffect(() => {
    const ext = (defaultExtension) =>
      isWebpSupported ? "webp" : defaultExtension;
    preload(
      [
        `${assetsDir}/home/bg-home-${size}.${ext("jpg")}`,
        `${assetsDir}/destination/bg-destination-${size}.${ext("jpg")}`,
        `${assetsDir}/crew/bg-crew-${size}.${ext("jpg")}`,
        `${assetsDir}/technology/bg-technology-${size}.${ext("jpg")}`,
        `${assetsDir}/destination/moon.${ext("png")}`,
        `${assetsDir}/crew/douglas-hurley.${ext("png")}`,
        `${assetsDir}/technology/launch-vehicle-${sizeNoMobile}.${ext("jpg")}`,
      ],
      1000
    );
  }, [isWebpSupported, size, sizeNoMobile]);

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
