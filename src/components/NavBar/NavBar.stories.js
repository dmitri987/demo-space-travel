import React from "react";
import NavBar from "./NavBar";
import { mocked } from "../Navs/BaseNavs";
import Navs from "../Navs/Navs";
import "../../index.css";
import { screen, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/NavBar",
  component: NavBar,
};

const menuItems = [
  { title: "home", url: "/" },
  { title: "destination", url: "/destination" },
  { title: "crew", url: "/crew" },
  { title: "technology", url: "/technology" },
];

const MockNavs = mocked(Navs);
export const Desktop = () => (
  <NavBar menuItems={menuItems} MenuComponent={MockNavs} />
);

export const Tablet = () => (
  <NavBar menuItems={menuItems} MenuComponent={MockNavs} tablet />
);

export const Mobile = () => (
  <NavBar menuItems={menuItems} MenuComponent={MockNavs} mobile />
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Some example UI interactions after story is loaded */
Mobile.play = async () => {
  await sleep(300);
  await userEvent.click(screen.getByAltText("toggle button"));
};
