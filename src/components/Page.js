import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import NavBar from "./NavBar/NavBar";
import { subscribeViewportWidthObserver } from "../helpers";
import data from "../data.js";

const tablet = data.breakpoints.tablet;
const desktop = data.breakpoints.desktop;
const tablet_px = tablet + "px";
const desktop_px = desktop + "px";

const StyledHeading = styled.h5`
  margin-inline-start: 12vw;
  font-family: "Barlow Condensed", sans-serif;
  font-style: normal;
  font-weight: normal;
  text-align: start;
  color: var(--color-white);
  align-self: end;
  margin-block-start: min(6vh, 60px);

  font-size: 28px;
  letter-spacing: 4.72px;

  @media (max-width: ${desktop_px}) {
    margin-inline-start: 2.5rem;
    margin-block-start: 40px;
    margin-block-end: max(5vh, 50px);
    font-size: 20px;
    letter-spacing: 2.38px;
  }

  @media (max-width: ${tablet_px}) {
    margin-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 2rem;
    text-align: center;
    align-self: start;
    font-size: 16px;
    letter-spacing: 2.7px;
  }

  & .index {
    opacity: 0.3;
    margin-inline-end: 0.75em;
    font-weight: bold;
  }
`;

const Heading = ({ index, heading }) => (
  <StyledHeading>
    <span className="index">{index <= 9 ? "0" + index : index}</span>
    <span>{heading}</span>
  </StyledHeading>
);

export const createPage = ({ activePageIndex, heading, pageName }) => {
  const gridTemlateRows = (navBarHeight, headingHeight, contentHeight) =>
    heading
      ? css`
          grid-template-rows: ${navBarHeight} ${headingHeight} ${contentHeight};
        `
      : css`
          grid-template-rows: ${navBarHeight} ${contentHeight};
        `;

  const backgroundImage = (size, ext = "jpg") => {
    const path = data.getBackgroundImagePath(pageName, size, ext);
    return css`
      background-image: url("${path}");
    `;
  };

  const Page = styled.div`
    display: grid;
    ${() => gridTemlateRows("clamp(8rem, 15vh, 10rem)", "auto", "1fr")}
    grid-template-columns: 100%;
    align-items: start;
    height: 100vh;
    width: 100vw;
    background-color: black;
    background-size: cover;
    background-position: top left;

    ${() => backgroundImage("desktop")}

    @media (max-width: ${desktop_px}) {
      ${() => gridTemlateRows("auto", "auto", "1fr")}
      ${() => backgroundImage("tablet")}
    }
    @media (max-width: ${tablet_px}) {
      ${() => gridTemlateRows("5.5rem", "auto", "1fr")}
      ${() => backgroundImage("mobile")}
      height: 100%;
      min-height: 100vh;
    }
  `;

  const Content = styled.div`
    display: grid;
    width: clamp(320px, 88vw, 1450px);
    height: 100%;
    margin: 0 auto;
    padding: 0;
    margin-inline-start: 12vw;
    overflow-y: hidden;

    @media (max-width: ${desktop_px}) {
      width: 100%;
      margin-inline-start: 0;
    }

    @media (max-width: ${tablet_px}) {
      margin-block-start: 0;
    }

    @media (min-width: 1920px) {
      margin-inline: auto;
    }
  `;

  return function PageComponent({ children }) {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
      return subscribeViewportWidthObserver(setViewportWidth);
    }, []);

    const styles = {
      mobile: viewportWidth <= tablet,
      tablet: viewportWidth <= desktop,
      desktop: viewportWidth > desktop,
    };

    return (
      <Page>
        <NavBar
          menuItems={data.navBar}
          {...styles}
          activeItem={activePageIndex}
        />
        {heading && <Heading index={activePageIndex} heading={heading} />}
        <Content>{children}</Content>
      </Page>
    );
  };
};
