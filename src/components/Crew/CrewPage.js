import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Bullets";
import bgImageDesktop from "./bg-crew-desktop.webp";
import bgImageTablet from "./bg-crew-tablet.webp";
import bgImageMobile from "./bg-crew-mobile.webp";
import anoushehAnsariImage from "./anousheh-ansari.webp";
import douglasHurleyImage from "./douglas-hurley.webp";
import markShuttleworthImage from "./mark-shuttleworth.webp";
import victorGloverImage from "./victor-glover.webp";
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
    rank: "commander",
    name: "Douglas Hurley",
    description:
      "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
  },
  {
    url: "#mark_shuttleworth",
    image: markShuttleworthImage,
    rank: "mission specialist",
    name: "Mark Shuttleworth",
    description:
      "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
  },
  {
    url: "#victor_glover",
    image: victorGloverImage,
    rank: "pilot",
    name: "Victor Glover",
    description:
      "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer. ",
  },
  {
    url: "#anousheh_ansari",
    image: anoushehAnsariImage,
    rank: "flight engineer",
    name: "Anousheh Ansari",
    description:
      "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space. ",
  },
];

const Content = styled.section`
  display: grid;
  grid-template-areas: "info image";
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  height: 100%;
  margin-inline: 5rem;

  @media (max-width: ${desktop}) {
    grid-template-areas: "info" "image";
    grid-template-columns: 40rem;
    grid-template-rows: auto 1fr;
    justify-content: center;
    gap: 0;
  }

  @media (max-width: ${tablet}) {
    grid-template-areas: "image" "info";
    grid-template-columns: clamp(300px, 80vw, 25rem);
    /* grid-template-rows: 50% 1fr; */
    gap: 1rem;
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
  }
`;

const Rank = styled.h4`
  grid-area: "rank";
  color: rgba(var(--color-white-rgb) / 30%);
`;

const Name = styled.h3`
  grid-area: "name";
  color: rgba(var(--color-white));
  margin-block: 0.5rem;

  @media (max-width: ${desktop}) {
    margin-block: 0.5rem;
  }
`;

const Description = styled.p`
  grid-area: "description";
  max-width: 30rem;
  margin-top: 1rem;
  margin-bottom: 6rem;

  @media (max-width: ${desktop}) {
    max-width: 100%;
    margin-bottom: 0;
  }
`;

const Image = styled.img`
  grid-area: image;
  max-width: 40rem;
  align-self: end;
  justify-self: start;

  @media (max-width: ${desktop}) {
    position: relative;
    max-width: 35rem;
    justify-self: center;
  }
  @media (max-width: ${tablet}) {
    max-width: 100%;
  }
`;

const Crew = () => {
  const { hash } = useLocation();
  const index = Math.max(
    crew.findIndex((p) => p.url === hash),
    0
  );
  const { rank, name, image, description } = crew[index];

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
            style={{ height: "6rem", gridArea: "tabs" }}
          />
        </Info>
        <Image src={image} alt="" />
      </Content>
    </Page>
  );
};

export default Crew;
