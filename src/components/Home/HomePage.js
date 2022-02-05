import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import ActionButton from "../ActionButton/ActionButton";
import data from "../../data.json";

// const path = (fileName) => `assets/Home/${fileName}`;

const Page = createPage({
  activePageIndex: 0,
  pageName: "home",
});

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const Content = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "info action";
  align-items: center;
  justify-content: center;
  justify-items: center;
  margin-block-start: 8vh;
  margin-block-end: 12vh;
  color: rgba(var(--color-white));

  @media (max-width: ${desktop}) {
    grid-template-columns: min-content;
    grid-template-areas:
      "info"
      "action";
    grid-template-rows: auto 1fr;
    height: 100%;
    margin-block-start: 0;
    margin-block-end: 0;

    align-self: center;
    justify-content: center;
    justify-items: center;
    align-items: center;
  }

  @media (max-width: ${tablet}) {
    grid-template-columns: clamp(15rem, 80vw, 25rem);
    grid-template-rows: min-content 1fr;
    align-content: start;
    margin-block-start: 20px;
    margin-inline: 8vw;
  }
`;

const Subtitle = styled.h5`
  font-size: 28px;
  letter-spacing: 4.72px;
  color: var(--color-gray);

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
  max-width: 450px;
  justify-self: start;

  @media (max-width: ${desktop}) {
    text-align: center;
    align-self: end;
    margin-block-start: 10vh;
    margin-block-end: 3vh;
  }

  @media (max-width: ${tablet}) {
    margin-block-start: 3vh;
    margin-block-end: 0;
    gap: 1rem;
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
      <NavLink to="/destination">
        <ActionButton style={{ gridArea: "action" }} />
      </NavLink>
    </Content>
  </Page>
);

export default Home;
