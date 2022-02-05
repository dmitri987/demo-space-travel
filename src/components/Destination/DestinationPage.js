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
  margin-inline-end: 5rem;
  justify-content: space-between;
  justify-items: center;
  margin-block-start: 6vh;
  align-self: start;
  text-align: start;
  color: rgb(var(--color-gray));

  @media (max-width: ${desktop}) {
    grid-template-columns: 70vw;
    grid-template-rows: auto 1fr;
    margin-block-start: 0;
    margin-inline-end: 0;
    justify-items: center;
    justify-content: center;
    align-self: start;
    text-align: center;
  }

  @media (max-width: ${tablet}) {
    grid-template-columns: 80vw;
    grid-template-rows: auto 1fr;
    margin-inline: 0;
    margin-block-end: 3rem;
  }
`;

const Info = styled.div`
  display: grid;
  justify-items: start;
  align-content: start;
  text-align: inherit;
  width: clamp(21rem, 31vw, 28rem);

  @media (max-width: ${desktop}) {
    justify-items: center;
    align-content: start;
    width: min(87vw, 573px);
  }
`;

const StyledNavs = styled(Navs)`
  height: 2.5rem;
  margin-bottom: 3vh;

  @media (max-width: ${desktop}) {
    margin-top: max(3vh, 30px);
    margin-bottom: max(3vh, 30px);
  }
`;

const Name = styled.h2`
  margin-bottom: min(1.5vh, 0.75rem);
  color: var(--color-white);

  @media (max-width: ${tablet}) {
    margin-bottom: 0.25rem;
  }
`;

const Image = styled.img`
  height: min(30vw, 45vh, 400px);
  aspect-ratio: 1;
  align-self: start;
  margin-block-start: 3rem;

  @media (max-width: ${desktop}) {
    height: min(40vw, 29vh, 300px);
    min-height: 270px;
    align-self: center;
    justify-self: center;
    margin-block-start: 0;
  }

  @media (max-width: ${tablet}) {
    height: max(45vw, 170px);
    min-height: unset;
  }
`;

const Stats = ({ title, value }) => (
  <div>
    <h6 className="subheading2 text-gray" style={{ marginBottom: "0.75rem" }}>
      {title}
    </h6>
    <p className="subheading1 text-white">{value}</p>
  </div>
);

const StatSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-top: min(3vh, 28px);
  justify-items: start;
  column-gap: 1.5rem;

  @media (max-width: ${desktop}) {
    justify-items: center;
  }

  @media (max-width: ${tablet}) {
    grid-template-columns: 1fr;
    row-gap: 32px;
    margin-top: 32px;
  }
`;

const Delimiter = styled.hr`
  width: 100%;
  border-color: rgba(var(--color-gray-rgb) / 20%);
  margin-top: min(5vh, 50px);

  @media (max-width: ${tablet}) {
    margin-top: max(3vh, 30px);
  }
`;

const pageName = "destination";

const Page = createPage({
  activePageIndex: 1,
  heading: "pick your destination",
  pageName,
});

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

const { assetsDir } = data;
const path = (fileName) => `${assetsDir}/${pageName}/${fileName}`;
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
          <StyledNavs items={planets} tabs activeItem={index} />
          <Name>{title}</Name>
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
