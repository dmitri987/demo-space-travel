import React, { useState } from "react";
import Navs from "../Navs/Navs";
import "./NavBar.css";
import logo from "./icons/favicon.svg";
import sandwich from "./icons/sandwich.svg";
import closeButton from "./icons/close.svg";
// import styled from "styled-components";

/**
 * breakpoints:
 *
 *
 * @param {*} param0
 * @returns
 */

const Toggler = ({ onClick }) => (
  <img className="toggler" onClick={onClick} src={sandwich} alt="toggle menu" />
);

const NavPanel = ({ items, MenuComponent, tablet, mobile }) => {
  const Menu = MenuComponent ?? Navs;
  const [show, setShow] = useState(false);
  const togglePanel = () => setShow(!show);

  return (
    <div className={"panel-with-toggler" + (!mobile ? " inline" : "")}>
      <Toggler onClick={togglePanel} />
      <div className={"panel" + (show ? " show" : "")}>
        <img
          className="close-button"
          onClick={togglePanel}
          src={closeButton}
          aria-hidden="true"
          alt=""
        />
        <Menu className="menu" items={items} vertical={mobile} tabs={tablet} />
      </div>
      {mobile && show && <div className="backdrop" onClick={togglePanel}></div>}
    </div>
  );
};

const NavBar = ({ menuItems, MenuComponent, tablet, mobile }) => {
  const size = mobile ? " mobile" : tablet ? " tablet" : " desktop";
  const desktop = !(tablet || mobile);

  return (
    <div className={"navbar" + size}>
      <a className="logo" href="/">
        <img src={logo} alt="go home" />
      </a>
      {desktop && <div className="decoration-line"></div>}
      <NavPanel
        items={menuItems}
        MenuComponent={MenuComponent}
        tablet={tablet}
        mobile={mobile}
      />
    </div>
  );
};

export default NavBar;
