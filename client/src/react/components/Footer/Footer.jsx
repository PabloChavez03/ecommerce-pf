import React from "react";
import instagram from "./images/instagram.png";
import whatsapp from "./images/whatsapp.png";
import about from "./images/informacion.png";
import css from './Footer.module.css'
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className={css.container} >
      <NavLink to="/info/dev">
        <img className={css.about} src={about} alt="About"/>  
      </NavLink>
      <div className={css.img}>
        <a href="https://www.instagram.com/soyhenry_ok/" target="_blank" rel="noreferrer"> 
        <img src={instagram} alt="Instagram"/>
        </a>
        <a href="https://api.whatsapp.com/send?phone=51921874847&text=Hola!%20Me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20los%20productos%20de%20Clothes%2022." target="_blank" rel="noreferrer">
          <img src={whatsapp} alt="Whatsapp"/>
        </a>
      </div>
    </div>
  );
};
export default Footer;
