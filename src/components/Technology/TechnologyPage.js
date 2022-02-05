import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Rounds";
import data from "../../data.js";
import { preload, isWebpSupported } from "../../helpers";

const tablet = data.breakpoints.tablet;
const desktop = data.breakpoints.desktop;
const tablet_px = tablet + "px";
const desktop_px = desktop + "px";

const Content = styled.section`
  display: grid;
  grid-template-areas: "navs info image";
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: minmax(50vh, auto);
  gap: 5vw;
  width: 100%;
  margin-block-start: 2rem;
  justify-content: space-between;
  align-items: center;
  align-self: start;
  color: rgba(var(--color-gray));

  @media (max-width: ${desktop_px}) {
    grid-template-areas: "image" "navs" "info";
    grid-template-columns: 100vw;
    grid-template-rows: auto auto 1fr;
    justify-items: center;
    margin-block-start: 0;
    margin-inline: 0;
    gap: 0;
  }
`;

const Subtitle = styled.h5`
  grid-area: subheader;
  font-size: 16px;
  letter-spacing: 2.7px;
  align-self: center;
  margin-bottom: 0.75rem;
  color: var(--color-gray);

  @media (max-width: ${desktop_px}) {
    margin-bottom: 0.5rem;
  }

  @media (max-width: ${tablet_px}) {
    font-size: 14px;
    letter-spacing: 2.36px;
    margin-bottom: 0;
  }
`;

const Title = styled.h3`
  grid-area: header;
  margin-bottom: 1rem;

  @media (max-width: ${desktop_px}) {
    margin-bottom: 1rem;
  }

  @media (max-width: ${tablet_px}) {
    margin-bottom: 0.5rem;
  }
`;

const Description = styled.p`
  grid-area: description;
  max-width: 30rem;
`;

const StyledNavs = styled(Navs)`
  grid-area: navs;

  @media (max-width: ${desktop_px}) {
    height: auto;
    margin-inline-start: 0;
    margin-block-start: 3rem;
    margin-block-end: 2.5rem;
  }

  @media (max-width: ${tablet_px}) {
    margin-block-start: 2rem;
    margin-block-end: 1.5rem;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-areas: "subheader" "header" "description";
  text-align: start;
  justify-self: start;
  margin-inline-end: 2rem;

  @media (max-width: ${desktop_px}) {
    justify-self: center;
    align-self: start;
    text-align: center;
    max-width: 40rem;
    gap: 0.5rem;
    margin-inline-end: 0;
  }

  @media (max-width: ${tablet_px}) {
    max-width: 85vw;
  }
`;

const Image = styled.img`
  grid-area: image;
  max-width: 35vw;
  justify-self: end;

  @media (max-width: ${desktop_px}) {
    min-width: 100vw;
    height: auto;
    justify-self: center;
  }
`;

const entry = (name, description) => ({
  url: `#${name.replace(" ", "_")}`,
  name,
  description,
});

const technology = [
  entry(
    "launch vehicle",
    "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!"
  ),
  entry(
    "spaceport",
    "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch."
  ),
  entry(
    "space capsule",
    "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained."
  ),
];

const pageName = "technology";

const Page = createPage({
  activePageIndex: 3,
  heading: "space launch 101",
  pageName,
});

const { assetsDir } = data;
const path = (fileName) => `${assetsDir}/${pageName}/${fileName}`;
const kebab = (str) => str.replace(" ", "-");

const imageUrl = (viewportWidth, name) => {
  const size = viewportWidth > desktop ? "desktop" : "tablet";
  const ext = isWebpSupported() ? "webp" : "jpg";
  return path(`${kebab(name)}-${size}.${ext}`);
};

export const preloadPageImage = (viewportWidth, image = 0, delay = 1000) => {
  if (typeof image === "number") {
    preload(imageUrl(viewportWidth, technology[image].name), delay);
    return;
  }

  preload(imageUrl(viewportWidth, image), delay);
};

const Technology = ({ viewportWidth }) => {
  const { hash } = useLocation();
  const index = Math.max(
    technology.findIndex((p) => p.url === hash),
    0
  );

  const { name, description } = technology[index];

  useEffect(() => {
    technology.forEach(({ name }) => preloadPageImage(viewportWidth, name, 0));
  }, [viewportWidth]);

  return (
    <Page>
      <Content>
        <StyledNavs
          items={technology}
          activeItem={index}
          vertical={viewportWidth >= desktop}
        />
        <Info>
          <Subtitle>THE TERMINOLOGY...</Subtitle>
          <Title>{name}</Title>
          <Description>{description}</Description>
        </Info>
        <Image src={imageUrl(viewportWidth, name)} alt="" />
      </Content>
    </Page>
  );
};

export default Technology;
