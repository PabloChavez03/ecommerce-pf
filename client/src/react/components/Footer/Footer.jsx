import React from "react";
//import { NavLink } from "react-router-dom";
import instagram from "./images/instagram.png";
import whatsapp from "./images/whatsapp.png";
import about from "./images/equipo.png";
import css from './Footer.module.css'

function Footer() {
  const handleClickButton = (event) => {
    alert("Funcionalidad en desarrollo!");
  };

  return (
    <div className={css.container} >
      {/* <NavLink to={"/"}> */}
      <img src={about} alt="Instagram" onClick={(e)=>handleClickButton(e)}/>
      {/* </NavLink> */}
      {/* <NavLink to={"/construction"}> */}
      <div className={css.img}>{/* <NavLink to={"/construction"}> */}
        <img src={instagram} alt="Instagram" onClick={(e)=>handleClickButton(e)}/>
      {/* </NavLink>
      <NavLink to={"/construction"}> */}
        <img src={whatsapp} alt="Whatsapp" onClick={(e)=>handleClickButton(e)}/>
      {/* </NavLink> */}
      </div>
      
    </div>
  );
};

export default Footer;
