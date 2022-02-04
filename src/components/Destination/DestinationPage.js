import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createPage } from "../Page";
import Navs from "../Navs/Tabs";
import data from "../../data.json";
import { preload, isWebpSupported } from "../../helpers";

const desktop = data.breakpoints.desktop + "px";
const tablet = data.breakpoints.tablet + "px";

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-inline: 5rem;
  justify-content: space-between;
  margin-block-start: 6vh;
  margin-block-end: 12vh;
  align-self: start;
  text-align: start;
  gap: 8vw;
  color: rgb(var(--color-gray));

  @media (max-width: ${desktop}) {
    grid-template-columns: 70vw;
    grid-template-rows: auto 1fr;
    margin-block-start: 3vh;
    justify-items: center;
    justify-content: center;
    align-self: start;
    text-align: center;
    gap: 1rem;
  }

  @media (max-width: ${tablet}) {
    grid-template-columns: 80vw;
    grid-template-rows: auto 1fr;
    margin-inline: 0;
    /* margin-block-end: 5rem; */
    /* margin-inline: 5vw; */
  }
`;

const Info = styled.div`
  display: grid;
  justify-items: start;
  align-content: start;
  text-align: inherit;
  max-width: 25rem;

  @media (max-width: ${desktop}) {
    justify-items: center;
    align-content: start;
    max-width: 40rem;
    /* gap: 1rem; */
  }
`;

const Image = styled.img`
  height: 25rem;
  /* max-height: 100%;
  max-width: 100%; */
  aspect-ratio: 1;
  justify-self: end;
  /* margin: 1rem; */

  @media (max-width: ${desktop}) {
    height: 20rem;
    align-self: center;
    justify-self: center;
    /* margin-block: 2rem; */
  }

  @media (max-width: ${tablet}) {
    max-height: 15rem;
    max-width: 15rem;
  }
`;

const Stats = ({ title, value }) => (
  <div>
    <h6 className="subheading2 text-gray" style={{ marginBottom: "1rem" }}>
      {title}
    </h6>
    <p className="subheading1 text-white">{value}</p>
  </div>
);

const StatSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: ${desktop}) {
    justify-items: center;
  }

  @media (max-width: ${tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 1rem;
  }
`;

const Delimiter = styled.hr`
  width: 100%;
  border-color: rgba(var(--color-gray-rgb) / 20%);
  margin-top: 2.25rem;
`;

const pageName = "destination";
const path = (fileName) => `assets/${pageName}/${fileName}`;

const Page = createPage({
  activePageIndex: 1,
  heading: "pick your destination",
  pageName,
});

// const entry = (title, description, avgDistance, estTravelTime) => ({
//   title,
//   url: `#${title}`,
//   description,
//   avgDistance
// })

const planets = [
  {
    title: "moon",
    url: "#moon",
    description:
      "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    avgDistance: "384,400 km",
    estTravelTime: "3 days",
  },
  {
    title: "mars",
    url: "#mars",
    description:
      "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
    avgDistance: "225 MIL. km",
    estTravelTime: "9 months",
  },
  {
    title: "europa",
    url: "#europa",
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    avgDistance: "628 MIL. km",
    estTravelTime: "3 years",
  },
  {
    title: "titan",
    url: "#titan",
    description:
      "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
    avgDistance: "1.6 bil. km",
    estTravelTime: "7 years",
  },
];

const imageUrl = (name, ext) => path(`${name}.${ext}`);

const Destination = () => {
  const { hash } = useLocation();
  const index = Math.max(
    planets.findIndex((p) => p.url === hash),
    0
  );

  const { title, description, avgDistance, estTravelTime } = planets[index];
  const ext = isWebpSupported() ? "webp" : "jpg";

  useEffect(() => {
    preload([...planets.map(({ title }) => imageUrl(title, ext))]);
  }, [ext]);

  return (
    <Page>
      <Content>
        <Image src={imageUrl(title, ext)} alt="" />
        <Info>
          <Navs
            items={planets}
            tabs
            activeItem={index}
            style={{
              height: "2.5rem",
              marginBottom: "1rem",
              marginTop: "0.5rem",
            }}
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
