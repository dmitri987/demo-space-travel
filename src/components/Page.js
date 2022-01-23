import React, { useState } from "react";
// import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import NavBar from "./NavBar/NavBar";
import data from "../data.json";
import { useViewportResizedWidth } from "../helpers";

// const setBackgroundImageUrl = (url, maxWidth = null) => {
//   if (!url) return;
//   if (!maxWidth)
//     return css`
//       background-image: url(${url});
//     `;

//   return css`
//     @media (max-width: ${maxWidth}) {
//       background-image: url(${url});
//     }
//   `;
// };

const StyledHeading = styled.h5`
  text-align: start;

  margin-inline-start: 3rem;
`;

const Heading = ({ index, heading }) => (
  <StyledHeading className="text-white">
    <span style={{ opacity: 0.25, marginInlineEnd: "1.5rem" }}>
      {index <= 9 ? "0" + index : index}
    </span>
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
  const { desktop, tablet } = data.breakpoints;

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
    // const viewportWidth = window.innerWidth;
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    useViewportResizedWidth(setViewportWidth);

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

        {children}
      </Page>
    );
  };
};
