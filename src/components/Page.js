import React from "react";
// import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Navs from "./Navs/Navs";

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
  pageName,
  bgImageDesktop,
  bgImageTablet,
  bgImageMobile,
  navbarItems,
}) => {
  const Page = styled.div`
    display: flow-root;
    min-height: 100vh;
    background-size: cover;
    background-position: center center;

    ${setBackgroundImageUrl(bgImageDesktop)}
    ${setBackgroundImageUrl(bgImageTablet, "1024px")}
    ${setBackgroundImageUrl(bgImageMobile, "750px")}
  `;

  console.log(navbarItems);

  return () => (
    <Page>
      <h3 style={{ color: "white" }}>{pageName}</h3>
      <Navs items={navbarItems} rounds />
      <Navs items={navbarItems} />
      <Navs items={navbarItems} tabs />
      <Navs items={navbarItems} bullets />
      <Navs items={navbarItems} background />
    </Page>
  );
};
