import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Bullets";
import data from "../../data.json";
import { preload, isWebpSupported } from "../../helpers";

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const Content = styled.section`
  display: grid;
  grid-template-areas: "info image";
  grid-template-columns: 1fr 1fr;
  justify-content: start;
  justify-items: start;
  height: 100%;
  max-height: 700px;

  @media (max-width: ${desktop}) {
    grid-template-areas: "info" "image";
    grid-template-columns: 40rem;
    grid-template-rows: min-content auto;
    justify-content: center;
    gap: 0;
    margin-inline-start: 0;
    min-height: 100%;
  }

  @media (max-width: ${tablet}) {
    grid-template-areas: "image" "info";
    grid-template-columns: clamp(300px, 85vw, 25rem);
    grid-template-rows: 223px 1fr;
    margin-inline: auto;
  }
`;

const Info = styled.div`
  grid-area: info;
  display: grid;
  grid-template-areas: "rank" "name" "description" "tabs";
  align-content: end;
  text-align: start;
  justify-self: start;

  @media (max-width: ${desktop}) {
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
    padding-block-end: 5rem;
    margin-block-start: 0;
    border-block-start: 1px solid rgba(var(--color-white-rgb) / 15%);
    width: min(85vw, 350px);
  }
`;

const Rank = styled.h4`
  grid-area: rank;
  margin-bottom: 0.5rem;
  color: rgba(var(--color-white-rgb) / 30%);

  @media (max-width: ${desktop}) {
    margin-bottom: 0.25rem;
  }
`;

const Name = styled.h3`
  grid-area: name;
  color: rgba(var(--color-white));
  margin-bottom: 1.5rem;

  @media (max-width: ${desktop}) {
    margin-bottom: 1.25rem;
  }

  @media (max-width: ${tablet}) {
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  grid-area: description;
  max-width: clamp(20rem, 32vw, 35rem);

  @media (max-width: ${desktop}) {
    max-width: 100%;
  }
`;

const StyledNavs = styled(Navs)`
  grid-area: tabs;
  height: auto;
  margin-block: 10vh;

  @media (max-width: ${desktop}) {
    margin-block: 4rem;
  }

  @media (max-width: ${tablet}) {
    margin-block: 2rem;
  }
`;

const Image = styled.img`
  grid-area: image;
  max-height: 70vh;
  max-width: 45vw;
  border-bottom: 1px solid rgba(var(--color-white-rgb) / 15%);
  align-self: end;
  justify-self: center;
  margin-inline-end: 5vw;
  overflow: hidden;

  @media (max-width: ${desktop}) {
    position: relative;
    height: 100%;
    max-width: none;
    max-height: none;
    margin-inline-end: 0;
    justify-self: center;
    border-bottom: none;
  }
`;

const pageName = "crew";

const crew = [
  {
    url: "#douglas_hurley",
    rank: "commander",
    name: "Douglas Hurley",
    description:
      "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
  },
  {
    url: "#mark_shuttleworth",
    rank: "mission specialist",
    name: "Mark Shuttleworth",
    description:
      "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
  },
  {
    url: "#victor_glover",
    rank: "pilot",
    name: "Victor Glover",
    description:
      "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer. ",
  },
  {
    url: "#anousheh_ansari",
    rank: "flight engineer",
    name: "Anousheh Ansari",
    description:
      "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space. ",
  },
];

const Page = createPage({
  activePageIndex: 2,
  heading: "meet your crew",
  pageName,
});

const { assetsDir } = data;
const path = (fileName) => `${assetsDir}/${pageName}/${fileName}`;
const kebab = (name) => name.toLowerCase().replace(" ", "-");
const imageUrl = (name, ext) => path(`${kebab(name)}.${ext}`);

const Crew = () => {
  const { hash } = useLocation();
  const index = Math.max(
    crew.findIndex((p) => p.url === hash),
    0
  );

  const { rank, name, description } = crew[index];
  const ext = isWebpSupported() ? "webp" : "jpg";

  useEffect(() => {
    preload([...crew.map(({ name }) => imageUrl(name, ext))]);
  }, [ext]);

  return (
    <Page>
      <Content>
        <Info>
          {/* <div> */}
          <Rank>{rank}</Rank>
          <Name>{name}</Name>
          <Description>{description}</Description>
          {/* </div> */}
          <StyledNavs items={crew} bullets activeItem={index} />
        </Info>
        <Image src={imageUrl(name, ext)} alt="" />
      </Content>
    </Page>
  );
};

export default Crew;
