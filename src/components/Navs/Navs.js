import React from "react";
import { NavLink } from "react-router-dom";

/**
 * titles, numbers, points, circles
 */

const Navs = ({ links }) => {
  return (
    <nav>
      {links.map(({ title, url }) => (
        <NavLink to={url} key={title}>
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navs;
