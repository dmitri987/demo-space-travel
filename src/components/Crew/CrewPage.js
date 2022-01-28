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
    imageWidth: "30rem",
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
    imageWidth: "40rem",
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
  min-height: 100%;
  margin-inline: 8vw;
  gap: 2rem;

  @media (max-width: ${desktop}) {
    grid-template-areas: "info" "image";
    grid-template-columns: 40rem;
    justify-content: center;
    gap: 0;
  }

  @media (max-width: ${tablet}) {
    grid-template-areas: "image" "info";
    grid-template-columns: 80vw;
    gap: 1rem;
  }
`;

const Info = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* justify-items: start; */
  text-align: start;
  margin-top: 10rem;
  margin-bottom: 3rem;
  justify-self: end;

  @media (max-width: ${desktop}) {
    margin-block: 1rem;
    text-align: center;
    align-items: center;
    justify-self: center;
  }
`;

const Rank = styled.h4`
  color: rgba(var(--color-white) / 50%);
`;

const Name = styled.h3`
  color: rgba(var(--color-white));
  margin-block: 1rem;

  @media (max-width: ${desktop}) {
    margin-block: 0.5rem;
  }
`;

const Description = styled.p`
  max-width: 30rem;
  color: rgba(var(--color-gray));

  @media (max-width: ${desktop}) {
    max-width: 100%;
  }
`;

const Image = styled.img`
  grid-area: image;
  width: 35rem;
  align-self: end;
  justify-self: start;

  @media (max-width: ${desktop}) {
    max-width: 30rem;
    justify-self: center;
  }
  @media (max-width: ${tablet}) {
    max-width: 20rem;
  }
`;

const Crew = () => {
  const { hash } = useLocation();
  const index = Math.max(
    crew.findIndex((p) => p.url === hash),
    0
  );
  const { rank, name, image, description, imageWidth } = crew[index];

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
            style={{ justifySelf: "end", height: "6rem" }}
          />
        </Info>
        <Image src={image} alt="" style={{ width: imageWidth }} />
      </Content>
    </Page>
  );
};

export default Crew;
