import React, { useState, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
// import styled from "styled-components";
import "./Navs.css";

/**
 * tabs, titles, points, circles
 *
 * 
 * .navs {
  display: flex;
  gap: 1rem;
  max-width: fit-content;
}
.navs > a {
  color: red;
  padding-bottom: 0.5rem;
}

a.
 */
// const Tab = styled(NavLink)`

// createNavs(createNavLink, onClick)
// createNavLink(number, title, url) => Component
// Navs(links/selector, active, setActive)
// `

// const createNavLink = ({ number, title, url, }) => (
//   <Link to={url} key={title} className={classes}>
//     {title}
// </Link>
// )

const LinkComponent = ({ url, children, onClick }) => (
  <Link to={url} onClick={onClick}>
    {children}
  </Link>
);

const Item = ({ isActive, url, onClick, children }) =>
  isActive ? (
    <li className="active">{children}</li>
  ) : (
    <li>
      <LinkComponent url={url} onClick={onClick}>
        {children}
      </LinkComponent>
    </li>
  );

/**
TODO:
  vertical
  remove ul/li ??
  animate only <a>
  Styling:
    --margin-block
    --gap
**/

const Navs = ({ items, tabs, rounds, bullets }) => {
  // console.log(items);
  const [active, setActive] = useState(0);
  const setActiveItem = (event) => {
    const item = event.target.closest("li"); // TODO: change it if don't use ul/li
    const index = [...item.parentElement.children].indexOf(item);
    setActive(index);
  };

  const classes = tabs
    ? "tabs"
    : rounds
    ? "rounds"
    : bullets
    ? "bullets"
    : "navs";

  return (
    <nav className={classes}>
      <ul>
        {items.map(({ title, url }, index) => (
          <Item
            isActive={active === index}
            url={url}
            key={title}
            onClick={setActiveItem}
          >
            {rounds ? (
              <span className="number">{index}</span>
            ) : bullets ? (
              <span>&nbsp;&nbsp;</span>
            ) : (
              <Fragment>
                {!tabs && (
                  <span className="number">
                    {(index < 9 ? "0" : "") + (index + 1)}
                  </span>
                )}
                <span className="title">{title}</span>
              </Fragment>
            )}
          </Item>
        ))}
      </ul>
    </nav>
  );
};

export default Navs;
