import React, { useState, Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
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

const Text = styled.h5`
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 2.7px;
`;

const DefaultLinkComponent = ({ url, children, onClick }) => (
  <NavLink to={url} onClick={onClick}>
    {children}
  </NavLink>
);

const MockLinkComponent = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

export const createNavs = (LinkComponent) => {
  const Item = ({ isActive, url, onClick, children }) =>
    isActive ? (
      <li className="active text-white">{children}</li>
    ) : (
      <li className="text-gray">
        <LinkComponent url={url} onClick={onClick}>
          {children}
        </LinkComponent>
      </li>
    );

  /**
TODO:
  vertical
  set active item from current url
  remove li ??
  animate only <a>
  Styling:
    --margin-block
    --gap
**/

  return function Navs({
    items,
    tabs,
    rounds,
    bullets,
    background,
    vertical,
    className,
    startingIndex,
    style,
    activeItem,
  }) {
    // console.log(items);
    const active =
      typeof activeItem === "string"
        ? Math.max(
            items.findIndex(
              (item) =>
                item.title.toLowerCase() === activeItem.toLowerCase() ||
                item.url.toLowerCase() === activeItem.toLowerCase()
            ),
            0
          )
        : activeItem ?? 0;

    // const [active, setActive] = useState(activeItem ?? 0);
    // const setActiveItem = (event) => {
    //   const item = event.target.closest("li"); // TODO: change it if don't use ul/li
    //   const index = [...item.parentElement.children].indexOf(item);
    //   setActive(index);
    // };

    const startIndex = startingIndex ?? 0;

    let classes = tabs
      ? "tabs"
      : rounds
      ? "rounds"
      : bullets
      ? "bullets"
      : "navs";

    if (background) classes += " background";
    if (vertical) classes += " vertical";
    if (className) classes += ` ${className}`;

    return (
      <nav className={classes} style={style}>
        {items.map(({ title, url }, index) => (
          <Item
            isActive={active === index}
            url={url}
            key={title}
            // onClick={setActiveItem}
          >
            {rounds ? (
              <Text>
                <span className="number">{index}</span>
              </Text>
            ) : bullets ? (
              <span>&nbsp;&nbsp;</span>
            ) : (
              <Text>
                {!tabs && (
                  <span className="number">
                    {(index + startIndex < 9 ? "0" : "") + (index + startIndex)}
                  </span>
                )}
                <span className="title">{title}</span>
              </Text>
            )}
          </Item>
        ))}
      </nav>
    );
  };
};

export default createNavs(DefaultLinkComponent);
export const MockNavs = createNavs(MockLinkComponent);
