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
    \${(props) => {
      console.log(props);
      if (props.vertical) return "border-inline-end: 2px solid transparent;";
      return "border-block-end: 2px solid transparent;";
    }}
      
    & > .index {
      margin-inline-end: 0.75em;
      font-weight: bold;
    } 
  `,
});

// xport default createNavs({
//   Navs: `
//     --text-color: var(--color-white);
//     --text-color-active: var(--color-white);
//     --border-color-active: var(--color-white);
//     --border-color-hover: var(--color-white);
//   `,
//   Item: `
//     font-size: 16px;
//     letter-spacing: 2.7px;
//     border-block-end: 2px solid transparent;

//     & > .index {
//       margin-inline-end: 0.75em;
//       font-weight: bold;
//     }

//     @media (min-width: ${tablet}) and (max-width: ${desktop}) {
//       font-size: 14px;
//       letter-spacing: 2.36px;
//     }
//    `,
// });
