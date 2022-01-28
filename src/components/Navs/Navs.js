import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import data from "../../data.json";

const tablet = data.breakpoints.tablet + "px";
const desktop = data.breakpoints.desktop + "px";

const Navs = styled.nav`
  --transition-duration: 0.2s;
  display: flex;
  height: 100%;
  width: 100%;
  place-content: center;
  align-items: stretch;
  gap: 3rem;

  & .link {
    height: 100%;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    border-radius: 1px;
    outline: none;
    cursor: pointer;
    font-size: inherit;
    letter-spacing: inherit;

    :focus-visible {
      outline: 1px solid var(--border-color-hover);
      outline-offset: 4px;
    }
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  border-bottom: var(--underline-width) solid transparent;
  text-decoration: none;
  list-style: none;
`;

const BaseItem = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-family: "Barlow Condensed", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: inherit;
  letter-spacing: inherit;
  text-transform: uppercase;
  color: var(--text-color, var(--color-white));
  transition: border var(--transition-duration) ease-in-out;

  &.active {
    color: var(--text-color-active);
    border-color: var(--border-color-active);
  }

  &:hover:not(.active) {
    border-color: var(--border-color-hover);
  }
`;

const ItemText = ({ index, title, leadingZero = true, startFromIndex = 0 }) => {
  const _index = index + startFromIndex;
  const leadingZeroIndex = leadingZero
    ? _index >= 0 && `${_index < 10 ? "0" : ""}${_index}`
    : _index;

  return (
    <>
      {index >= 0 && <span className="index">{leadingZeroIndex}</span>}
      {title && <span className="title">{title}</span>}
    </>
  );
};

const DefaultLink = ({ url, children, className }) => (
  <NavLink to={url} className={className}>
    {children}
  </NavLink>
);

export const defaultComponents = {
  Navs,
  Link: DefaultLink,
  Item: BaseItem,
  ItemText,
};

const isStyles = (arg) => typeof arg === "string";

const getComponentFromArgs = (name, args, stylesAllowed = true) => {
  const newComponent = args?.[name];
  if (!newComponent) return defaultComponents[name];

  if (isStyles(newComponent)) {
    if (!stylesAllowed)
      throw new TypeError(
        `Argument for component "${name}" can not be styles; must be a React component`
      );

    return styled(defaultComponents[name])`
      ${newComponent}
    `;
  }
  return newComponent;
};

export const createNavs = (args) => {
  const Navs = getComponentFromArgs("Navs", args);
  const _Link = getComponentFromArgs("Link", args, false);
  const Item = getComponentFromArgs("Item", args);
  const ItemText = getComponentFromArgs("ItemText", args, false);

  return function Navigations(props) {
    const { items, activeItem, className, style, Link = _Link } = props;

    const initialActiveIndex =
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

    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
    const setActiveListItem = (event) => {
      const item = event.target.closest("li"); // TODO: change it if don't use ul/li
      const index = [...item.parentElement.children].indexOf(item);
      setActiveIndex(index);
    };

    return (
      <Navs className={className} style={style}>
        {items.map(({ title, url }, index) => {
          const active = index === activeIndex;
          if (active)
            return (
              <ListItem key={url}>
                <Item className="item active">
                  <ItemText index={index} title={title} />
                </Item>
              </ListItem>
            );

          return (
            <ListItem key={url} onClick={setActiveListItem}>
              <Link className="link" url={url}>
                <Item className="item">
                  <ItemText index={index} title={title} />
                </Item>
              </Link>
            </ListItem>
          );
        })}
      </Navs>
    );
  };
};

const MockLink = ({ className, children }) => (
  <button className={className}>{children}</button>
);

export const mocked = (BaseComponent) => (props) =>
  <BaseComponent {...props} Link={MockLink} />;

/** Tabs with indices:  <index> <title> */
export const TabsWithIndices = createNavs({
  Navs: `
    --text-color: var(--color-white);
    --text-color-active: var(--color-white);
    --border-color-active: var(--color-white);
    --border-color-hover: var(--color-white);
  `,
  Item: `  
    font-size: 16px;
    letter-spacing: 2.7px;
    border-block-end: 2px solid transparent;
  
    & > .index {
      margin-inline-end: 0.75em;
      font-weight: bold;
    }
  
    @media (min-width: ${tablet}) and (max-width: ${desktop}) {
      font-size: 14px;
      letter-spacing: 2.36px;
    }
   `,
});

/** Simple tabs without indices */
export const Tabs = createNavs({
  Navs: `
    --text-color: var(--color-gray);
    --text-color-active: var(--color-white);
    --border-color-active: var(--color-white);
    --border-color-hover: var(--color-gray);

    height: 3em;
    gap: 2em;
    font-size: 16px;
    letter-spacing: 2.7px;

    @media (max-width: ${tablet}) {
      font-size: 14px;
      letter-spacing: 2.36px;
    }   
  `,
  Item: `
    border-block-end: 2px solid transparent;
  `,
  ItemText: (props) => <ItemText {...props} index={undefined} />,
});

/** Bullets */
const BulletItem = styled.div`
  --color: rgba(var(--color-white-rgb) / 30%);
  width: var(--bullet-size);
  height: var(--bullet-size);
  border-radius: 50%;
  border: none;
  transition: all var(--transition-duration) ease-in-out;

  background: var(--color);

  &.active {
    background: var(--color-white);
  }

  &:hover:not(.active) {
    background: rgba(var(--color-white-rgb) / 70%);
  }
`;

export const Bullets = createNavs({
  Navs: `
    --color-focus: rgba(var(--color-white-rgb) / 50%);
    --bullet-size: 15px;
    gap: 24px;

    @media (max-width: ${desktop}) {
      --bullet-size: 10px;
      gap: 16px;
    }

    & .link {
      width: fit-content;
      height: fit-content;
      border-radius: 50%;

      :focus-visible {
        background: var(--color-focus);
        outline: 1px solid var(--color-focus);
        outline-offset: 4px;
      }
    }

  `,
  Item: BulletItem,
  ItemText: () => <span>&nbsp;&nbsp;</span>,
});

/** Rounds */
export const Rounds = createNavs({
  Navs: `
    --text-color: var(--color-gray);
    --text-color-active: var(--color-black);
    --border-color-active: var(--color-white);
    --border-color-hover: var(--color-gray);
    --size: 80px;

    gap: 32px;
    font-size: 32px;
    letter-spacing: 2px;

    @media (max-width: ${desktop}) {
      --size: 60px;
      font-size: 24px;
      letter-spacing: 1.5px;
      gap: 16px;
    }   

    @media (max-width: ${tablet}) {
      --size: 40px;
      font-size: 16px;
      letter-spacing: 1px;
    }

    & .link {
      width: fit-content;
      height: fit-content;
      border-radius: 50%;

      :focus-visible {
        background: var(--color-white);
        outline: 1px solid var(--color-white);
        outline-offset: 0;        
      }
    }
  `,
  Item: `
    display: flex;
    justify-content: center;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: var(--color-black);
    color: var(--color-white);
    border: 2px solid rgba(var(--color-white-rgb) / 30%);

    &.active {
      background: var(--color-white);
      color: var(--color-black);
      border-color: var(--color-white);
    }
    
    &:hover {
      border-color: var(--color-white);
    }
  `,
  ItemText: (props) => (
    <ItemText
      {...props}
      title={undefined}
      leadingZero={false}
      startFromIndex={1}
    />
  ),
});
