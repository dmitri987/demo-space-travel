import React, { useState } from "react";
// import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import NavBar from "./NavBar/NavBar";
import data from "../data.json";
import { useViewportResizedWidth } from "../helpers";

const setBackgroundImageUrl = (url, maxWidth = null) => {
  if (!url) return;
  if (!maxWidth)
    return css`
      background-image: url(${url});
    `;

  return css`
    @media (max-width: ${maxWidth}) {
      background-image: url(${url});
    }
  `;
};

export const createPage = ({
  title,
  bgImageDesktop,
  bgImageTablet,
  bgImageMobile,
}) => {
  const { desktop, tablet } = data.breakpoints;

  const Page = styled.div`
    display: flow-root;
    min-height: 100vh;
    background-size: cover;
    background-position: center center;

    ${setBackgroundImageUrl(bgImageDesktop)}
    ${setBackgroundImageUrl(bgImageTablet, desktop + "px")}
    ${setBackgroundImageUrl(bgImageMobile, tablet + "px")}
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
        <NavBar menuItems={data.navBar} {...styles} activeItem={title} />
        {children}
      </Page>
    );
  };
};
