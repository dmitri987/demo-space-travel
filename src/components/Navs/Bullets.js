import { createNavs } from "./BaseNavs";
import styled from "styled-components";
import data from "../../data.js";

const desktop = data.breakpoints.desktop + "px";

/** Bullets */
const BulletItem = styled.div`
  --color: rgba(var(--color-white-rgb) / 30%);
  width: var(--bullet-size);
  height: var(--bullet-size);
  border-radius: 50%;
  border: none;
  transition: all var(--transition-duration) ease-in-out;

  background: var(--color);

  &.active {
    background: var(--color-white);
  }

  &:hover:not(.active) {
    background: rgba(var(--color-white-rgb) / 70%);
  }
`;

export default createNavs({
  Navs: `
    --color-focus: rgba(var(--color-white-rgb) / 50%);
    --bullet-size: 15px;
    gap: 24px;

    @media (max-width: ${desktop}) {
      --bullet-size: 10px;
      gap: 16px;
    }

    & .link {
      width: fit-content;
      height: fit-content;
      border-radius: 50%;

      :focus-visible {
        background: var(--color-focus);
        outline: 1px solid var(--color-focus);
        outline-offset: 4px;
      }
    }

  `,
  Item: BulletItem,
  ItemText: () => <span>&nbsp;&nbsp;</span>,
});
