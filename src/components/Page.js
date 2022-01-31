import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./NavBar/NavBar";
import { subscribeViewportWidthObserver } from "../helpers";
import data from "../data.json";

const tablet = data.breakpoints.tablet;
const desktop = data.breakpoints.desktop;
const tablet_px = tablet + "px";
const desktop_px = desktop + "px";

const StyledHeading = styled.h5`
  margin-inline-start: 3rem;
  margin-block-end: 4rem;
  font-family: "Barlow Condensed", sans-serif;
  font-style: normal;
  font-weight: normal;
  text-align: start;
  color: var(--color-white);

  font-size: 28px;
  letter-spacing: 4.72px;

  @media (max-width: ${desktop_px}) {
    font-size: 20px;
    letter-spacing: 2.38px;
  }

  @media (max-width: ${tablet_px}) {
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
  const Page = styled.div`
    display: grid;
    grid-template-rows: 12rem 2rem 1fr;
    align-items: start;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    background-color: black;
    background-size: cover;
    background-position: center center;

    background-image: url(${bgImageDesktop});

    @media (max-width: ${tablet_px}) {
      grid-template-rows: 8rem 4rem 1fr;
      /* overflow: auto; */
      background-image: url(${bgImageMobile});
    }

    @media (max-width: ${desktop_px}) and (min-width: ${tablet_px}) {
      grid-template-rows: 8rem 4rem 1fr;
      /* overflow: auto; */
      background-image: url(${bgImageTablet});
    }
  `;

  const Content = styled.div`
    display: grid;
    width: clamp(320px, 100vw, 1600px);
    height: 100%;
    margin: 0 auto;
    padding: 0;
  `;

  return ({ children }) => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
      return subscribeViewportWidthObserver(setViewportWidth);
    }, []);

    const styles = {
      mobile: viewportWidth < tablet,
      tablet: viewportWidth < desktop,
      desktop: viewportWidth >= desktop,
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
