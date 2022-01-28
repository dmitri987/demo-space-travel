import React from "react";
import { mocked } from "./BaseNavs";
import _Navs from "./Navs";
import _Tabs from "./Tabs";
import _Bullets from "./Bullets";
import _Rounds from "./Rounds";
import "../../index.css";

export default {
  title: "Navs",
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

const MockNavs = mocked(_Navs);
export const Navs = (args) => (
  <div style={{ margin: "1rem" }}>
    <small className="text-gray">
      Resize viewport to see how it looks on different screen sizes
    </small>
    <div style={{ margin: "5rem", height: "5rem", width: "20rem" }}>
      <MockNavs {...args} items={items} indexed />
    </div>
  </div>
);
Navs.args = {
  vertical: false,
};

const MockTabs = mocked(_Tabs);
export const Tabs = (args) => (
  <div style={{ margin: "1rem" }}>
    <small className="text-gray">
      Resize viewport to see how it looks on different screen sizes
    </small>
    <div style={{ margin: "3rem", height: "5rem", width: "80%" }}>
      <MockTabs {...args} items={items} />
    </div>
  </div>
);
Tabs.args = {
  indexed: false,
  vertical: false,
};

const MockBullets = mocked(_Bullets);
export const Bullets = () => (
  <div style={{ margin: "1rem" }}>
    <small className="text-gray">
      Resize viewport to see how it looks on different screen sizes
    </small>
    <div style={{ margin: "3rem", height: "5rem", width: "80%" }}>
      <MockBullets items={items} />
    </div>
  </div>
);

const MockRounds = mocked(_Rounds);
export const Rounds = ({ vertical }) => (
  <div style={{ margin: "1rem" }}>
    <small
      className="text-gray"
      style={{ display: "block", marginBottom: "3rem" }}
    >
      Resize viewport to see how it looks on different screen sizes
    </small>
    <h5 className="text-white">Horizontal:</h5>
    <div
      style={{
        margin: "3rem",
        height: "5rem",
        width: "80%",
        marginLeft: "15rem",
      }}
    >
      <MockRounds items={items} style={{ width: "fit-content" }} />
    </div>

    <h5 className="text-white">Vertical:</h5>
    <div
      style={{
        margin: "2rem auto auto 15rem",
        width: "50vw",
        display: "grid",
        justifyContent: "start",
      }}
    >
      <MockRounds items={items} vertical={vertical} />
      {/* <MockRounds items={items} style={{ flexDirection: "column" }} />; */}
    </div>
  </div>
);
Rounds.args = {
  vertical: true,
};

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
