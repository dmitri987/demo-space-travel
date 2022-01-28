import { createNavs, defaultComponents } from "./BaseNavs";
import data from "../../data.json";

const tablet = data.breakpoints.tablet + "px";

/** Simple Tabs without indices:  <title> */
export default createNavs({
  Navs: `
    --text-color: var(--color-gray);
    --text-color-active: var(--color-white);
    --border-color-active: var(--color-white);
    --border-color-hover: var(--color-gray);

    width: fit-content;
    height: 3em;
    gap: 2em;
    font-size: 16px;
    letter-spacing: 2.7px;

    @media (max-width: ${tablet}) {
      font-size: 14px;
      letter-spacing: 2.36px;
    }   
  `,
  Item: `  
    & > .index {
      margin-inline-end: 0.75em;
      font-weight: bold;
    } 
  `,
});
