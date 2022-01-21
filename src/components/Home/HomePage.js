import React from "react";
import styled from "styled-components";
// import '../../index.css'
import { createPage } from "../Page";
import bgImageDesktop from "./bg-home-desktop.jpg";
import bgImageTablet from "./bg-home-tablet.jpg";
import bgImageMobile from "./bg-home-mobile.jpg";
// import "./HomePage.css";

const Page = createPage({
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

const Content = styled.section`
  color: rgba(var(--color-white));
`;

const Home = () => (
  <Page>
    <Content>
      <h5>SO, YOU WANT TO TRAVEL TO</h5>
      <h1>SPACE</h1>
      <p>
        Let’s face it; if you want to go to space, you might as well genuinely
        go to outer space and not hover kind of on the edge of it. Well sit
        back, and relax because we’ll give you a truly out of this world
        experience!
      </p>
    </Content>
  </Page>
);

export default Home;
