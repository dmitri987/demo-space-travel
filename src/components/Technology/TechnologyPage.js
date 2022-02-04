import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Rounds";
import data from "../../data.json";
import { preload, isWebpSupported } from "../../helpers";

const tablet = data.breakpoints.tablet;
const desktop = data.breakpoints.desktop;
const tablet_px = tablet + "px";
const desktop_px = desktop + "px";

const Content = styled.section`
  display: grid;
  grid-template-areas: "navs info image";
  grid-template-columns: auto 1fr minmax(22rem, 1fr);
  grid-template-rows: minmax(50vh, auto);
  gap: 5vw;
  margin-block-start: 1rem;
  margin-block-end: 5rem;
  margin-inline-start: 4rem;
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
    /* margin-block-end: 20vh; */
    margin-inline: 0;
    gap: 2.5rem;
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
    margin-bottom: 0;
  }

  @media (max-width: ${tablet_px}) {
    font-size: 14px;
    letter-spacing: 2.36px;
  }
`;

const Title = styled.h3`
  grid-area: header;
  margin-bottom: 1rem;

  @media (max-width: ${desktop_px}) {
    margin-bottom: 1rem;
  }
`;

const StyledNavs = styled(Navs)`
  grid-area: navs;
  /* justify-self: end; */
  margin-inline-start: 5vw;
  /* align-self: start; */

  @media (max-width: ${desktop_px}) {
    /* justify-self: center; */
    margin-inline-start: 0;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-areas: "subheader" "header" "description";
  max-width: 30rem;
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
    max-width: 80vw;
  }
`;

const Image = styled.img`
  grid-area: image;
  max-width: 40vw;
  justify-self: end;

  @media (max-width: ${desktop_px}) {
    min-width: 100vw;
    height: auto;
    justify-self: center;
  }
`;

const pageName = "technology";
const path = (fileName) => `assets/${pageName}/${fileName}`;

const Page = createPage({
  activePageIndex: 3,
  heading: "space launch 101",
  pageName,
});

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
    "space-capsule",
    "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained."
  ),
];

const kebab = (str) => str.replace(" ", "-");
const imageUrl = (name, size, ext) => path(`${kebab(name)}-${size}.${ext}`);

const Technology = ({ viewportWidth }) => {
  const { hash } = useLocation();
  const index = Math.max(
    technology.findIndex((p) => p.url === hash),
    0
  );

  const { name, description } = technology[index];

  const size = viewportWidth > desktop ? "desktop" : "tablet";
  const ext = isWebpSupported() ? "webp" : "jpg";

  useEffect(() => {
    preload([...technology.map(({ name }) => imageUrl(name, size, ext))]);
  }, [size, ext]);

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
          <p style={{ gridArea: "description" }}>{description}</p>
        </Info>
        <Image src={imageUrl(name, size, ext)} alt="" />
      </Content>
    </Page>
  );
};

export default Technology;
