import { createNavs, defaultComponents } from "./BaseNavs";
import data from "../../data.json";

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const { ItemText } = defaultComponents;

/** Rounds */
const BaseRounds = createNavs({
  Navs: `
    --text-color: var(--color-gray);
    --text-color-active: var(--color-black);
    --border-color-active: var(--color-white);
    --border-color-hover: var(--color-gray);
    --size: 80px;

    gap: 32px;
    font-size: 32px;
    letter-spacing: 2px;

    @media (max-width: ${desktop}) {
      --size: 60px;
      font-size: 24px;
      letter-spacing: 1.5px;
      gap: 16px;
    }   

    @media (max-width: ${tablet}) {
      --size: 40px;
      font-size: 16px;
      letter-spacing: 1px;
    }

    & .link {
      width: fit-content;
      height: fit-content;
      border-radius: 50%;

      :focus-visible {
        background: var(--color-white);
        outline: 1px solid var(--color-white);
        outline-offset: 0;        
      }
    }
  `,
  Item: `
    display: flex;
    justify-content: center;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: var(--color-black);
    color: var(--color-white);
    border: 2px solid rgba(var(--color-white-rgb) / 30%);

    &.active {
      background: var(--color-white);
      color: var(--color-black);
      border-color: var(--color-white);
    }
    
    &:hover {
      border-color: var(--color-white);
    }
  `,
  ItemText: (props) => (
    <ItemText
      {...props}
      title={undefined}
      leadingZero={false}
      startFromIndex={1}
    />
  ),
});

export default function Rounds(props) {
  return <BaseRounds {...props} indexed />;
}
