import React from "react";
import { NavLink } from "react-router-dom";

export default () => (
  <header className="Header-header">
    <h1 className="Header-h1">Challenge Bank front</h1>
    <nav className="Header-nav">
      <NavLink
        exact
        to="/"
        className="Header-navLink"
        activeClassName="Header-isActive"
      >
        Home
      </NavLink>
      <NavLink
        exact
        to="/cities"
        className="Header-navLink"
        activeClassName="Header-isActive"
      >
        Cities
      </NavLink>
    </nav>
  </header>
);
