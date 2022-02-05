import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home/HomePage";
import DestinationPage, {
  preloadPageImage as preloadDefaultDestinationImage,
} from "./components/Destination/DestinationPage";
import CrewPage, {
  preloadPageImage as preloadDefaultCrewImage,
} from "./components/Crew/CrewPage";
import TechnologyPage, {
  preloadPageImage as preloadDefaultTechnologyImage,
} from "./components/Technology/TechnologyPage";
import ProjectInfo from "./components/ProjectInfo/ProjectInfo";
import { subscribeViewportWidthObserver } from "./helpers";
import "./App.css";
import data from "./data.js";

function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    return subscribeViewportWidthObserver(setViewportWidth);
  }, []);

  useEffect(() => {
    data.preloadBackgroundImages(viewportWidth);
    preloadDefaultCrewImage();
    preloadDefaultDestinationImage();
    preloadDefaultTechnologyImage(viewportWidth);
  }, [viewportWidth]);

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
