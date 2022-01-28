import React from "react";
import NavBar from "./NavBar";
import { mocked } from "../Navs/BaseNavs";
import Navs from "../Navs/Navs";
import "../../index.css";

export default {
  title: "NavBar",
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
