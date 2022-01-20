import React from "react";
import { MockNavs as Navs } from "./Navs";
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

const Template = (args) => (
  <div style={{ margin: "3rem", height: "5rem", width: "80%" }}>
    <Navs {...args} />;
  </div>
);

export const Navigations = Template.bind({});
Navigations.args = {
  items,
  startingIndex: 1,
};

export const Tabs = Template.bind({});
Tabs.args = {
  items,
  tabs: true,
};

export const Rounds = Template.bind({});
Rounds.args = {
  items,
  rounds: true,
};

export const Bullets = Template.bind({});
Bullets.args = {
  items,
  bullets: true,
};

export const WithBackground = Template.bind({});
WithBackground.args = {
  items,
  background: true,
};

export const Vertical = Template.bind({});
Vertical.args = {
  items,
  background: true,
  vertical: true,
};
