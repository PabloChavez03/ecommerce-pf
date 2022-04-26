import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div>
      <NavLink to={"/"}>
        <button>About Us!</button>
      </NavLink>
      <NavLink to={"/"}>
        <button>Instagram</button>
      </NavLink>
      <NavLink to={"/"}>
        <button>Whats App!</button>
      </NavLink>
    </div>
  );
};

export default Footer;
