import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navs = styled.nav`
  --transition-duration: 0.2s;
  display: flex;
  ${({ vertical }) =>
    vertical
      ? `
    flex-direction: column;
    height: fit-content;
    width: 100%;
    gap: 1em;
  `
      : `
    height: 100%;
    width: fit-content;
    gap: 3em;
  `}
  place-content: center;
  align-items: stretch;

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
    text-decoration: none;

    ${({ vertical }) => vertical && "width: 100%;"}

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
  font-family: "Barlow Condensed", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: inherit;
  letter-spacing: inherit;
  text-transform: uppercase;
  color: var(--text-color, var(--color-white));
  transition: border var(--transition-duration) ease-in-out;

  ${({ vertical }) =>
    vertical
      ? `
    border-inline-end: 4px solid transparent;
    width: 100%;
    padding-block: 0.5em;
  `
      : `
    border-block-end: 2px solid transparent;
    height: 100%;    
  `}

  &.active {
    color: var(--text-color-active);
    border-color: var(--border-color-active);
  }

  &:hover:not(.active) {
    border-color: var(--border-color-hover);
  }

  & > * {
    color: inherit;
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
    const {
      items,
      activeItem,
      className,
      style,
      vertical,
      indexed,
      Link = _Link,
    } = props;

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
      <Navs className={className} style={style} vertical={vertical}>
        {items.map(({ title, url }, index) => {
          const active = index === activeIndex;
          if (active)
            return (
              <ListItem key={url}>
                <Item className="item active" vertical={vertical}>
                  <ItemText index={indexed ? index : undefined} title={title} />
                </Item>
              </ListItem>
            );

          return (
            <ListItem key={url} onClick={setActiveListItem}>
              <Link className="link" url={url}>
                <Item className="item" vertical={vertical}>
                  <ItemText index={indexed ? index : undefined} title={title} />
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
