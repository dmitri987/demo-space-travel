import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home/HomePage";
import DestinationPage from "./components/Destination/DestinationPage";
import CrewPage from "./components/Crew/CrewPage";
import TechnologyPage from "./components/Technology/TechnologyPage";
// import { createPage } from "./components/Page";
import "./App.css";

// const HomePage = createPage({ pageName: "home" });

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/destination" element={<DestinationPage />} />
        <Route path="/crew" element={<CrewPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
      </Routes>
    </div>
  );
}

export default App;
