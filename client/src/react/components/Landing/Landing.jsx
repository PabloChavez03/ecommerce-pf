import React from "react";
import CategoryLanding from "../CategoryLanding/CategoryLanding";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div>
      <NavLink to={"/home"}>
        <button>Home</button>
      </NavLink>
      <CategoryLanding />
    </div>
  );
}

export default Landing;
