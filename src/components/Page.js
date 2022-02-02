import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import NavBar from "./NavBar/NavBar";
import { subscribeViewportWidthObserver } from "../helpers";
import data from "../data.json";

const tablet = data.breakpoints.tablet;
const desktop = data.breakpoints.desktop;
const tablet_px = tablet + "px";
const desktop_px = desktop + "px";

const StyledHeading = styled.h5`
  margin-inline-start: 3rem;
  /* margin-block-end: 4rem; */
  font-family: "Barlow Condensed", sans-serif;
  font-style: normal;
  font-weight: normal;
  text-align: start;
  color: var(--color-white);
  align-self: center;

  font-size: 28px;
  letter-spacing: 4.72px;

  @media (max-width: ${desktop_px}) {
    font-size: 20px;
    letter-spacing: 2.38px;
  }

  @media (max-width: ${tablet_px}) {
    margin-inline-start: 0;
    text-align: center;
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

export const createPage = ({
  activePageIndex,
  heading,
  bgImageDesktop,
  bgImageTablet,
  bgImageMobile,
}) => {
  const gridTemlateRows = (navBar, title, content) =>
    heading
      ? css`
          grid-template-rows: ${navBar} ${title} ${content};
        `
      : css`
          grid-template-rows: ${navBar} ${content};
        `;

  const Page = styled.div`
    display: grid;
    ${() =>
      gridTemlateRows(
        "clamp(8rem, 15vh, 10rem)",
        "clamp(5rem, 10vh, 7rem)",
        "1fr"
      )}
    align-items: start;
    min-height: 100vh;
    width: 100vw;
    background-color: black;
    background-size: cover;
    background-position: center center;

    background-image: url(${bgImageDesktop});

    @media (max-width: ${desktop_px}) {
      ${() => gridTemlateRows("auto", "4rem", "1fr")}
      background-image: url(${bgImageTablet});
    }
    @media (max-width: ${tablet_px}) {
      ${() => gridTemlateRows("5rem", "5rem", "1fr")}
      background-image: url(${bgImageMobile});
    }
  `;

  const Content = styled.div`
    display: grid;
    width: clamp(320px, 100vw, 1450px);
    height: 100%;
    margin: 0 auto;
    padding: 0;
    overflow-x: hidden;
  `;

  return ({ children }) => {
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
