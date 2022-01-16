import React from "react";
import { createPage } from "../Page";
import bgImageDesktop from "./bg-home-desktop.jpg";
import bgImageTablet from "./bg-home-tablet.jpg";
import bgImageMobile from "./bg-home-mobile.jpg";
// import "./HomePage.css";

console.log("HomePage:", bgImageMobile);
const HomePage = createPage({
  pageName: "home",
  bgImageDesktop,
  bgImageTablet,
  bgImageMobile,
});

// const HomePage = (props) => {
//   return (
//     <div className="HomePage">
//       <h2>Home</h2>
//     </div>
//   );
// };

export default HomePage;
