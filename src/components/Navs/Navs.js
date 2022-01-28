import { createNavs } from "./BaseNavs";
import data from "../../data.json";

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

/** Tabs with indices:  <index> <title> */
export default createNavs({
  Navs: `
    --text-color: var(--color-white);
    --text-color-active: var(--color-white);
    --border-color-active: var(--color-white);
    --border-color-hover: rgba(var(--color-white-rgb) / 50%);
  `,
  Item: `  
    font-size: 16px;
    letter-spacing: 2.7px;

    & > .index {
      margin-inline-end: 0.75em;
      font-weight: bold;
    } 
  
    @media (min-width: ${tablet}) and (max-width: ${desktop}) {
      font-size: 14px;
      letter-spacing: 2.36px;
    }
   `,
});
