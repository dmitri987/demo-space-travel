import React from "react";
import { mocked } from "./BaseNavs";
import _Navs from "./Navs";
import _Tabs from "./Tabs";
import _Bullets from "./Bullets";
import _Rounds from "./Rounds";
import "../../index.css";

export default {
  title: "Components/Navs",
  component: _Navs,
  decorators: [
    (Story) => (
      <div style={{ margin: "1rem" }}>
        <small className="text-gray" style={{ paddingBottom: "2rem" }}>
          Resize viewport to see how it looks on different screen sizes
        </small>
        <div
          style={{
            margin: "3rem",
            height: "5rem",
            width: "25rem",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};

const items = [
  { title: "moon", url: "#moon" },
  { title: "mars", url: "#mars" },
  { title: "venus", url: "#venus" },
];

const MockNavs = mocked(_Navs);
export const Navs = (args) => <MockNavs {...args} items={items} indexed />;
Navs.args = {
  vertical: false,
  startFromIndex: 0,
};
Navs.storyName = "Navs";

const MockTabs = mocked(_Tabs);
export const Tabs = (args) => <MockTabs {...args} items={items} />;
Tabs.args = {
  indexed: false,
};

const MockBullets = mocked(_Bullets);
export const Bullets = () => <MockBullets items={items} />;

const MockRounds = mocked(_Rounds);
export const Rounds = (args) => <MockRounds {...args} items={items} />;
Rounds.args = {
  vertical: false,
};
