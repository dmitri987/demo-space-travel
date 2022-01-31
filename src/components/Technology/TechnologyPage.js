import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Rounds";
import bgImageDesktop from "./bg-technology-desktop.webp";
import bgImageTablet from "./bg-technology-tablet.webp";
import bgImageMobile from "./bg-technology-mobile.webp";
import launchVehicleDesktopImage from "./launch-vehicle-desktop.webp";
import launchVehicleTabletImage from "./launch-vehicle-tablet.webp";
import spaceCapsuleDesktopImage from "./space-capsule-desktop.webp";
import spaceCapsuleTabletImage from "./space-capsule-tablet.webp";
import spaceportDesktopImage from "./spaceport-desktop.webp";
import spaceportTabletImage from "./spaceport-tablet.webp";
import data from "../../data.json";

const Page = createPage({
  activePageIndex: 3,
  heading: "space launch 101",
  bgImageDesktop,
  bgImageTablet,
  bgImageMobile,
});

const tablet = data.breakpoints.tablet;
const desktop = data.breakpoints.desktop;
const tablet_px = tablet + "px";
const desktop_px = desktop + "px";

const Content = styled.section`
  display: grid;
  grid-template-areas:
    "navs info image"
    "navs info image"
    "navs info image"
    " .    .   image";
  grid-template-columns: 6rem 1fr 1fr;
  gap: 3rem;
  /* width: 100%; */
  margin-block-start: 10%;
  margin-inline-start: 4rem;
  justify-content: space-between;
  /* align-self: center; */
  color: rgba(var(--color-gray));

  @media (max-width: ${desktop_px}) {
    grid-template-areas: "image" "navs" "info";
    grid-template-columns: 100vw;
    grid-template-rows: auto auto 1fr;
    justify-items: center;
    margin-inline: 0;
    gap: 2.5rem;
  }
`;

const Subtitle = styled.h5`
  grid-area: "subheader";
  font-size: 16px;
  letter-spacing: 2.7px;
  align-self: center;
  color: var(--color-gray);

  @media (max-width: ${tablet_px}) {
    font-size: 14px;
    letter-spacing: 2.36px;
  }
`;

const Title = styled.h3`
  grid-area: "header";

  @media (max-width: ${desktop_px}) {
    margin-bottom: 1rem;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-areas: "subheader" "header" "description";
  /* gap: 1rem; */
  max-width: 30rem;
  text-align: start;
  justify-self: start;

  @media (max-width: ${desktop_px}) {
    justify-self: center;
    align-self: start;
    text-align: center;
    max-width: 40rem;
    gap: 0.5rem;
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

const technology = [
  {
    url: "#launch_vehicle",
    name: "launch vehicle",
    imageDesktop: launchVehicleDesktopImage,
    imageTablet: launchVehicleTabletImage,
    description:
      "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
  },
  {
    url: "#spaceport",
    name: "spaceport",
    imageDesktop: spaceportDesktopImage,
    imageTablet: spaceportTabletImage,
    description:
      "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
  },
  {
    url: "#space_capsule",
    name: "space capsule",
    imageDesktop: spaceCapsuleDesktopImage,
    imageTablet: spaceCapsuleTabletImage,
    description:
      "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
  },
];

const Technology = ({ viewportWidth }) => {
  const { hash } = useLocation();
  const index = Math.max(
    technology.findIndex((p) => p.url === hash),
    0
  );
  const { name, imageDesktop, imageTablet, description } = technology[index];

  return (
    <Page>
      <Content>
        <Navs
          items={technology}
          activeItem={index}
          vertical={viewportWidth >= desktop}
          style={{ gridArea: "navs" }}
        />
        <Info>
          <Subtitle>THE TERMINOLOGY...</Subtitle>
          <Title>{name}</Title>
          <p style={{ gridArea: "description" }}>{description}</p>
        </Info>
        <Image
          src={viewportWidth >= desktop ? imageDesktop : imageTablet}
          alt=""
        />
      </Content>
    </Page>
  );
};

export default Technology;
