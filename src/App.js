import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home/HomePage";
import DestinationPage from "./components/Destination/DestinationPage";
import CrewPage from "./components/Crew/CrewPage";
import TechnologyPage from "./components/Technology/TechnologyPage";
import ProjectInfo from "./components/ProjectInfo/ProjectInfo";
// import { createPage } from "./components/Page";
import { subscribeViewportWidthObserver } from "./helpers";
import "./App.css";

// const HomePage = createPage({ pageName: "home" });

function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    return subscribeViewportWidthObserver(setViewportWidth);
  }, []);

  return (
    <div className="App">
      <ProjectInfo />
      <Routes>
        <Route index element={<HomePage viewportWidth={viewportWidth} />} />
        <Route
          path="/destination"
          element={<DestinationPage viewportWidth={viewportWidth} />}
        />
        <Route
          path="/crew"
          element={<CrewPage viewportWidth={viewportWidth} />}
        />
        <Route
          path="/technology"
          element={<TechnologyPage viewportWidth={viewportWidth} />}
        />
      </Routes>
    </div>
  );
}

export default App;
