import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Bullets";
import bgImageDesktop from "./bg-crew-desktop.jpg";
import bgImageTablet from "./bg-crew-tablet.jpg";
import bgImageMobile from "./bg-crew-mobile.jpg";
import anoushehAnsariImage from "./anousheh-ansari.png";
import douglasHurleyImage from "./douglas-hurley.png";
import markShuttleworthImage from "./mark-shuttleworth.png";
import victorGloverImage from "./victor-glover.png";
import anoushehAnsariImageWebP from "./anousheh-ansari.webp";
import douglasHurleyImageWebP from "./douglas-hurley.webp";
import markShuttleworthImageWebP from "./mark-shuttleworth.webp";
import victorGloverImageWebP from "./victor-glover.webp";
import data from "../../data.json";

const Page = createPage({
  activePageIndex: 2,
  heading: "meet your crew",
  bgImageDesktop,
  bgImageTablet,
  bgImageMobile,
});

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const crew = [
  {
    url: "#douglas_hurley",
    image: douglasHurleyImage,
    imageWebP: douglasHurleyImageWebP,
    rank: "commander",
    name: "Douglas Hurley",
    description:
      "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
  },
  {
    url: "#mark_shuttleworth",
    image: markShuttleworthImage,
    imageWebP: markShuttleworthImageWebP,
    rank: "mission specialist",
    name: "Mark Shuttleworth",
    description:
      "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
  },
  {
    url: "#victor_glover",
    image: victorGloverImage,
    imageWebP: victorGloverImageWebP,
    rank: "pilot",
    name: "Victor Glover",
    description:
      "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer. ",
  },
  {
    url: "#anousheh_ansari",
    image: anoushehAnsariImage,
    imageWebP: anoushehAnsariImageWebP,
    rank: "flight engineer",
    name: "Anousheh Ansari",
    description:
      "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space. ",
  },
];

const Content = styled.section`
  display: grid;
  grid-template-areas: "info image";
  grid-template-columns: auto minmax(30rem, auto);
  justify-content: start;
  justify-items: start;
  height: 100%;
  margin-inline-start: 10vw;
  /* gap: 5vw; */

  @media (max-width: ${desktop}) {
    grid-template-areas: "info" "image";
    grid-template-columns: 40rem;
    grid-template-rows: auto 50vh;
    justify-content: center;
    gap: 0;
    margin-inline-start: 0;
  }

  @media (max-width: ${tablet}) {
    grid-template-areas: "image" "info";
    grid-template-columns: clamp(300px, 80vw, 25rem);
    grid-template-rows: 35vh 1fr;
    margin-inline: auto;
  }
`;

const Info = styled.div`
  grid-area: info;
  display: grid;
  grid-template-areas: "rank" "name" "description" "tabs";
  align-content: end;
  text-align: start;
  margin-bottom: 3rem;
  justify-self: start;

  @media (max-width: ${desktop}) {
    margin-block: 1rem;
    text-align: center;
    align-items: center;
    align-content: end;
    justify-self: center;
    align-self: end;
    justify-content: start;
    justify-items: center;
  }

  @media (max-width: ${tablet}) {
    align-self: start;
    grid-template-areas: "tabs" "rank" "name" "description";
    margin-block-end: 5rem;
    margin-block-start: 0;
    border-block-start: 1px solid rgba(var(--color-white-rgb) / 15%);
  }
`;

const Rank = styled.h4`
  grid-area: "rank";
  color: rgba(var(--color-white-rgb) / 30%);
`;

const Name = styled.h3`
  grid-area: "name";
  color: rgba(var(--color-white));
  /* margin-block: 0.5vh; */

  @media (max-width: ${desktop}) {
    margin-block: 0.5rem;
  }
`;

const Description = styled.p`
  grid-area: "description";
  max-width: 30rem;
  margin-top: 1rem;
  margin-bottom: 6vh;

  @media (max-width: ${desktop}) {
    max-width: 100%;
    margin-bottom: 0;
    margin-top: 0.5rem;
  }
`;

const Picture = styled.picture`
  grid-area: image;
  height: 100%;
  max-height: clamp(30rem, 66vh, 35rem);
  align-self: end;
  justify-self: center;
  margin-inline: 5rem;
  overflow: hidden;

  @media (max-width: ${desktop}) {
    position: relative;
    max-height: 100%;
    justify-self: center;
  }
  @media (max-width: ${tablet}) {
    /* height: 30vh; */
    /* max-width: 15rem; */
    /* width: 100%; */
    /* max-width: 10rem; */
    /* max-height: 45vh; */
  }
`;

const Crew = () => {
  const { hash } = useLocation();
  const index = Math.max(
    crew.findIndex((p) => p.url === hash),
    0
  );
  const { rank, name, image, imageWebP, description } = crew[index];

  return (
    <Page>
      <Content>
        <Info>
          <div>
            <Rank>{rank}</Rank>
            <Name>{name}</Name>
            <Description>{description}</Description>
          </div>
          <Navs
            items={crew}
            bullets
            activeItem={index}
            style={{ height: "4rem", gridArea: "tabs" }}
          />
        </Info>
        <Picture>
          <source srcSet={imageWebP} type="image/webp" />
          <img src={image} style={{ height: "100%" }} alt="" />
        </Picture>
      </Content>
    </Page>
  );
};

export default Crew;
