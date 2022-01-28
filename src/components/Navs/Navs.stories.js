import React from "react";
import { TabsWithIndices as Navs, Tabs, Bullets, Rounds, mocked } from "./Navs";
import "../../index.css";

export default {
  title: "Navs",
  component: Navs,
};

const items = [
  { title: "moon", url: "#moon" },
  { title: "mars", url: "#mars" },
  { title: "venus", url: "#venus" },
];

// const Template = (args) => (
//   <div style={{ margin: "3rem", height: "5rem", width: "80%" }}>
//     <Navs {...args} />;
//   </div>
// );

const MockNavs = mocked(Navs);
export const TabsWithIndices = () => (
  <div style={{ margin: "1rem" }}>
    <small className="text-gray">
      Resize viewport to see how it looks on different screen sizes
    </small>
    <div style={{ margin: "3rem", height: "5rem", width: "80%" }}>
      <MockNavs items={items} />;
    </div>
  </div>
);

const MockTabs = mocked(Tabs);
export const TabsWithoutIndices = () => (
  <div style={{ margin: "1rem" }}>
    <small className="text-gray">
      Resize viewport to see how it looks on different screen sizes
    </small>
    <div style={{ margin: "3rem", height: "5rem", width: "80%" }}>
      <MockTabs items={items} />;
    </div>
  </div>
);

const MockBullets = mocked(Bullets);
export const BulletedTabs = () => (
  <div style={{ margin: "1rem" }}>
    <small className="text-gray">
      Resize viewport to see how it looks on different screen sizes
    </small>
    <div style={{ margin: "3rem", height: "5rem", width: "80%" }}>
      <MockBullets items={items} />;
    </div>
  </div>
);

const MockRounds = mocked(Rounds);
export const RoundedTabs = () => (
  <div style={{ margin: "1rem" }}>
    <small
      className="text-gray"
      style={{ display: "block", marginBottom: "3rem" }}
    >
      Resize viewport to see how it looks on different screen sizes
    </small>
    <h5 className="text-white">Horizontal:</h5>
    <div style={{ margin: "3rem", height: "5rem", width: "80%" }}>
      <MockRounds items={items} />;
    </div>

    <h5 className="text-white">Vertical:</h5>
    <div style={{ margin: "2rem auto", width: "50vw" }}>
      <MockRounds items={items} style={{ flexDirection: "column" }} />;
    </div>
  </div>
);

// export const Rounds = Template.bind({});
// Rounds.args = {
//   items,
//   rounds: true,
// };

// export const Bullets = Template.bind({});
// Bullets.args = {
//   items,
//   bullets: true,
// };

// export const WithBackground = Template.bind({});
// WithBackground.args = {
//   items,
//   background: true,
// };

// export const Vertical = Template.bind({});
// Vertical.args = {
//   items,
//   background: true,
//   vertical: true,
// };
