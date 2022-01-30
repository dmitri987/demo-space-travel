import React, { useState } from "react";
import styled from "styled-components";
import icon from "./toggle_icon.svg";
import closeIcon from "./close_icon.svg";

const DURATION = ".5";

const Backdrop = styled.div`
  display: grid;
  place-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  transform: translate(-100vw, 100vh);
  z-index: 2;
  transition: transform ${DURATION}s ease-in-out;

  .show & {
    transform: translate(0);
  }
`;

const Toggle = styled.img`
  position: fixed;
  left: 2rem;
  bottom: 2rem;
  opacity: 30%;
  cursor: pointer;
  z-index: 1;
  transition: all ${DURATION * 0.8}s ease-in-out;

  :hover {
    opacity: 80%;
    transform: scale(1.25);
  }

  .show & {
    transform: scale(0);
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 24px;
  height: 24px;
  opacity: 10%;
  cursor: pointer;
`;

const Panel = styled.div`
  position: relative;
  width: clamp(20rem, 100vw, 35rem);
  min-height: 20vh;
  padding-inline: clamp(0.75rem, 5vw, 3rem);
  /* padding-block-start: 1rem; */
  padding-block-end: 3rem;
  border-radius: 4px;
  text-align: start;
  background: #222;
  box-shadow: 5px 5px 15px 5px rgba(0 0 0 / 30%);
  transform: scale(0);
  opacity: 0;
  transition: all ${(DURATION * 2) / 3}s ease-in-out;

  .show & {
    transform: scale(1);
    opacity: 1;
    transition: all ${DURATION / 2}s ease-in-out ${DURATION / 2.5}s;
  }

  & h5 {
    font-size: 14px;
    margin-block-start: 3rem;
    margin-block-end: 1rem;
    letter-spacing: 1.5px;
  }

  & p {
    margin-block-start: 1rem;
    font-size: 16px;
    line-height: 1.5;
  }

  & a {
    color: lightblue;
    font-family: "Barlow", sans-serif;
    font-size: 16px;
    text-decoration: none;
  }
`;

const List = styled.ul`
  list-style: none inside;
  padding-inline-start: 0;

  & li {
    font-family: "Barlow", sans-serif;
    line-height: 1.75;
    color: var(--color-gray);
  }
`;

const ListItem = ({ title, url }) => (
  <li>
    <a href={url} target="_blank" rel="noreferrer">
      {title}
    </a>
  </li>
);

const noClick = (event) => {
  event.stopPropagation();
};

const ProjectInfo = (props) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <div className={show ? "show" : ""}>
      <Toggle
        className="icon"
        src={icon}
        title="About this project"
        alt="toggle"
        onClick={toggleShow}
      />
      <Backdrop onClick={toggleShow}>
        <Panel onClick={noClick}>
          <CloseIcon src={closeIcon} alt="close window" onClick={toggleShow} />
          <h5>About this project</h5>
          <p>
            Design and idea of this project are from{" "}
            <a
              href="https://www.frontendmentor.io/challenges/space-tourism-multipage-website-gRWj1URZ3"
              target="_blank"
              rel="noreferrer"
            >
              one of the "Frontend Mentor" challenges.
            </a>{" "}
            I liked it, because it's beautiful and most of things were
            recurring, so it was a natural candidate for component approach.
          </p>
          <p>
            Originally it's done with vanilla JS/HTML/CSS. I thought I'd do it
            with React.
          </p>
          <h5>Used technologies</h5>
          <List>
            <ListItem title="React" url="https://reactjs.org/" />
            <ListItem title="React Router" url="https://reactrouter.com/" />
            <ListItem
              title="styled components"
              url="https://styled-components.com/"
            />
            <ListItem title="Storybook" url="https://storybook.js.org/" />
            <ListItem
              title="Create React App"
              url="https://create-react-app.dev/"
            />
          </List>
        </Panel>
      </Backdrop>
    </div>
  );
};

export default ProjectInfo;
