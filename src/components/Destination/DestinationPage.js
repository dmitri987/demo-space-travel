import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Tabs";
import bgImageDesktop from "./bg-destination-desktop.webp";
import bgImageTablet from "./bg-destination-tablet.webp";
import bgImageMobile from "./bg-destination-mobile.webp";
import moonImage from "./moon.webp";
import marsImage from "./mars.webp";
import europaImage from "./europa.webp";
import titanImage from "./titan.webp";
import data from "../../data.json";

const Page = createPage({
  activePageIndex: 1,
  heading: "pick your destination",
  bgImageDesktop,
  bgImageTablet,
  bgImageMobile,
});

// const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 27rem;
  height: 100%;
  margin-inline: 10vw;
  justify-content: space-between;
  text-align: start;
  gap: 2.5rem;
  color: rgb(var(--color-gray));

  @media (max-width: ${desktop}) {
    grid-template-columns: 70vw;
    justify-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem;
  }
`;

const Info = styled.div`
  display: grid;
  gap: 2rem;
  justify-items: start;
  align-content: start;
  text-align: inherit;

  @media (max-width: ${desktop}) {
    justify-items: center;
    align-content: start;
    gap: 1rem;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 450px;
  aspect-ratio: 1;

  @media (max-width: ${desktop}) {
    width: 300px;
    height: 300px;
  }
`;

const Stats = ({ title, value }) => (
  <div>
    <h6 className="subheading2" style={{ marginBottom: "0.5rem" }}>
      {title}
    </h6>
    <p className="subheading1 text-white">{value}</p>
  </div>
);

const StatSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  @media (max-width: ${desktop}) {
    justify-items: center;
  }
`;

const Delimiter = styled.hr`
  width: 100%;
  border-color: rgba(var(--color-gray) / 20%);
  margin-top: 1rem;
`;

const planets = [
  {
    title: "moon",
    url: "#moon",
    image: moonImage,
    description:
      "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    avgDistance: "384,400 km",
    estTravelTime: "3 days",
  },
  {
    title: "mars",
    url: "#mars",
    image: marsImage,
    description:
      "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
    avgDistance: "225 MIL. km",
    estTravelTime: "9 months",
  },
  {
    title: "europa",
    url: "#europa",
    image: europaImage,
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    avgDistance: "628 MIL. km",
    estTravelTime: "3 years",
  },
  {
    title: "titan",
    url: "#titan",
    image: titanImage,
    description:
      "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
    avgDistance: "1.6 bil. km",
    estTravelTime: "7 years",
  },
];

const Destination = () => {
  const { hash } = useLocation();
  const index = Math.max(
    planets.findIndex((p) => p.url === hash),
    0
  );
  const { title, image, description, avgDistance, estTravelTime } =
    planets[index];

  return (
    <Page>
      <Content>
        <Image src={image} alt="" />
        <Info>
          <Navs
            items={planets}
            tabs
            activeItem={index}
            style={{ height: "2.8rem" }}
          />
          <h2 className="text-white">{title}</h2>
          <p>{description}</p>
          <Delimiter />
          <StatSection>
            <Stats title="AVG. DISTANCE" value={avgDistance} />
            <Stats title="EST. TRAVEL TIME" value={estTravelTime} />
          </StatSection>
        </Info>
      </Content>
    </Page>
  );
};

export default Destination;
