import React from "react";
import { NavLink } from "react-router-dom";
import style from "./styles/Header.module.css";

const HeaderAdmin = () => {
  return (
    <>
      <header className={style.headerContainer}>
        <NavLink to={`/`} style={{ textDecoration: "none" }}>
          <h2>CLOTHES 22</h2>
        </NavLink>
        <NavLink to={`/`} style={{ textDecoration: "none" }}>
          <button className={style.headerButton}>VER MI TIENDA</button>
        </NavLink>
      </header>
    </>
  );
};

export default HeaderAdmin;
