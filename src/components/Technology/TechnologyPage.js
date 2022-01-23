import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Navs";
import bgImageDesktop from "./bg-technology-desktop.jpg";
import bgImageTablet from "./bg-technology-tablet.jpg";
import bgImageMobile from "./bg-technology-mobile.jpg";
import launchVehicleDesktopImage from "./launch-vehicle-desktop.jpg";
import launchVehicleTabletImage from "./launch-vehicle-tablet.jpg";
import spaceCapsuleDesktopImage from "./space-capsule-desktop.jpg";
import spaceCapsuleTabletImage from "./space-capsule-tablet.jpg";
import spaceportDesktopImage from "./spaceport-desktop.jpg";
import spaceportTabletImage from "./spaceport-tablet.jpg";
import { useViewportResizedWidth } from "../../helpers";

// import anoushehAnsariImage from "./anousheh-ansari.png";
// import douglasHurleyImage from "./douglas-hurley.png";
// import markShuttleworthImage from "./mark-shuttleworth.png";
// import victorGloverImage from "./victor-glover.png";
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
  width: 100vw;
  margin-inline-start: 4rem;
  justify-content: space-between;
  color: rgba(var(--color-gray));

  @media (max-width: ${desktop_px}) {
    grid-template-areas: "image" "navs" "info";
    grid-template-columns: 100vw;
    grid-template-rows: auto auto auto;
    justify-items: center;
    margin-inline: 0;
    gap: 2.5rem;
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-areas: "subheader" "header" "description";
  gap: 1rem;
  max-width: 30rem;
  text-align: start;
  justify-self: start;

  @media (max-width: ${desktop_px}) {
    justify-self: center;
    text-align: center;
    max-width: 40rem;
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

const Technology = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useViewportResizedWidth(setViewportWidth);

  const { hash } = useLocation();
  const index = Math.max(
    technology.findIndex((p) => p.url === hash),
    0
  );
  const { name, imageDesktop, imageTablet, description } = technology[index];
  // console.log(viewportWidth, desktop);

  return (
    <Page>
      <Content>
        <Navs
          items={technology}
          activeItem={index}
          rounds
          vertical={viewportWidth >= desktop}
          style={{ gridArea: "navs" }}
        />
        <Info>
          <h5 style={{ gridArea: "subheader" }}>THE TERMINOLOGY...</h5>
          <h3 style={{ gridArea: "header" }}>{name}</h3>
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
