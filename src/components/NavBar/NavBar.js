import React from "react";
import Navs from "../Navs/Navs";
import "./NavBar.css";
import logo from "./icons/favicon.svg";
import sandwich from "./icons/sandwich.svg";
// import styled from "styled-components";

/**
 * breakpoints:
 *
 *
 * @param {*} param0
 * @returns
 */

const toggleNavPanel = () => {
  console.log("toggle");
};

const Toggler = () => (
  <img
    className="toggler"
    onClick={toggleNavPanel}
    src={sandwich}
    alt="toggle menu"
  />

  // <button className="toggler" onClick={toggleNavPanel}>
  // </button>
);

const NavBar = ({ menuItems, MenuComponent, tablet, mobile }) => {
  const Menu = MenuComponent ?? Navs;
  console.log("NavBar");
  const size = mobile ? " mobile" : tablet ? " tablet" : " desktop";

  return (
    <div className={"navbar" + size}>
      <a className="logo" href="/">
        <img src={logo} alt="go home" />
      </a>
      {!mobile && <div className="decoration-line"></div>}
      {mobile ? (
        <Toggler />
      ) : tablet ? (
        <Menu className="menu tablet" items={menuItems} tabs />
      ) : (
        <Menu className="menu" items={menuItems} />
      )}
    </div>
  );
};

export default NavBar;
