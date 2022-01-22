import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home/HomePage";
import DestinationPage from "./components/Destination/DestinationPage";
// import { createPage } from "./components/Page";
import "./App.css";

// const HomePage = createPage({ pageName: "home" });

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/destination" element={<DestinationPage />} />
      </Routes>
    </div>
  );
}

export default App;
