import React from "react";
import styled from "styled-components";
import { createPage } from "../Page";
import ActionButton from "../ActionButton/ActionButton";
import bgImageDesktop from "./bg-home-desktop.jpg";
import bgImageTablet from "./bg-home-tablet.jpg";
import bgImageMobile from "./bg-home-mobile.jpg";
import data from "../../data.json";

const Page = createPage({
  activePageIndex: 0,
  bgImageDesktop,
  bgImageTablet,
  bgImageMobile,
});

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const Content = styled.section`
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-areas: "info action";
  gap: 2rem;
  align-items: end;
  justify-content: space-between;
  margin-block-start: 20vh;
  margin-inline: 10vw;
  min-height: 50vh;
  color: rgba(var(--color-white));

  @media (max-width: ${desktop}) {
    grid-template-columns: min-content;
    grid-template-areas:
      "info"
      "action";
    margin-block-start: 10vh;
    justify-content: center;
    justify-items: center;
    gap: 15vh;
  }

  @media (max-width: ${tablet}) {
    grid-template-columns: 22rem;
    margin-block-start: 8vh;
  }
`;

const Subtitle = styled.h5`
  font-size: 28px;
  letter-spacing: 4.72px;

  @media (max-width: ${desktop}) {
    font-size: 20px;
    letter-spacing: 3.38px;
  }

  @media (max-width: ${tablet}) {
    font-size: 16px;
    letter-spacing: 2.7px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: start;
  grid-area: info;
  color: rgb(var(--color-gray));

  @media (max-width: ${desktop}) {
    /* gap: 1rem; */
    text-align: center;
  }

  @media (max-width: ${tablet}) {
    gap: 1.5rem;
  }
`;

const Home = () => (
  <Page>
    <Content>
      <Info>
        <Subtitle>SO, YOU WANT TO TRAVEL TO</Subtitle>
        <h1 className="text-white">SPACE</h1>
        <p>
          Let’s face it; if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well sit
          back, and relax because we’ll give you a truly out of this world
          experience!
        </p>
      </Info>
      <ActionButton style={{ gridArea: "action" }} />
    </Content>
  </Page>
);

export default Home;
