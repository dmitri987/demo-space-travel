import React from "react";
import styled from "styled-components";
import data from "../../data.js";

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const StyledButton = styled.button`
  width: 274px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  outline: 0 solid rgba(var(--color-gray-rgb) / 10%);
  background: var(--color-white);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    outline-width: 90px;
  }

  @media (max-width: ${desktop}) {
    width: 242px;

    &:hover {
      outline-width: 80px;
    }
  }

  @media (max-width: ${tablet}) {
    width: 150px;

    &:hover {
      outline-width: 50px;
    }
  }
`;

const ActionButton = () => (
  <StyledButton>
    <h4 className="text-black">EXPLORE</h4>
  </StyledButton>
);

export default ActionButton;
