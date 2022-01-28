import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "./NavBar/NavBar";
import data from "../data.json";
import { useViewportResizedWidth } from "../helpers";

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const StyledHeading = styled.h5`
  margin-inline-start: 3rem;
  font-family: "Barlow Condensed", sans-serif;
  font-style: normal;
  font-weight: normal;
  text-align: start;
  color: var(--color-white);

  font-size: 28px;
  letter-spacing: 4.72px;

  @media (max-width: ${desktop}) {
    font-size: 20px;
    letter-spacing: 2.38px;
  }

  @media (max-width: ${tablet}) {
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
    grid-template-rows: 12rem 8rem 1fr;
    align-items: start;
    height: 100vh;
    overflow: hidden;
    background-size: cover;
    background-position: center center;

    background-image: url(${bgImageDesktop});

    @media (max-width: ${tablet + "px"}) {
      grid-template-rows: 8rem 4rem 1fr;
      overflow: auto;
      background-image: url(${bgImageMobile});
    }

    @media (max-width: ${desktop + "px"}) and (min-width: ${tablet + "px"}) {
      grid-template-rows: 8rem 4rem 1fr;
      overflow: auto;
      background-image: url(${bgImageTablet});
    }
  `;

  return ({ children }) => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    useViewportResizedWidth(setViewportWidth);

    const styles = {
      mobile: viewportWidth < data.breakpoints.tablet,
      tablet: viewportWidth < data.breakpoints.desktop,
      desktop: viewportWidth >= data.breakpoints.desktop,
    };

    return (
      <Page>
        <NavBar
          menuItems={data.navBar}
          {...styles}
          activeItem={activePageIndex}
        />
        {heading && <Heading index={activePageIndex} heading={heading} />}

        {children}
      </Page>
    );
  };
};
