import React from "react";
//import { NavLink } from "react-router-dom";
import instagram from "./images/instagram.png";
import whatsapp from "./images/whatsapp.png";
import about from "./images/informacion.png";
import css from './Footer.module.css'
import { NavLink } from "react-router-dom";

function Footer() {
  const handleClickButton = (event) => {
    alert("Funcionalidad en desarrollo!");
  };

  return (
    <div className={css.container} >
    
      <img className={css.about} src={about} alt="About" onClick={(e)=>handleClickButton(e)}/>
     
      
      <div className={css.img}>
        <a href="https://www.instagram.com/ramirocasanova/?hl=en" target="_blank" rel="noreferrer"> 
        <img src={instagram} alt="Instagram"/>
        </a>
        <a href="https://api.whatsapp.com/send?phone=51921874847&text=Hola%20soy%20Kenneth!%20" target="_blank" rel="noreferrer">
          <img src={whatsapp} alt="Whatsapp"/>
        </a>
      </div>
    </div>
  );
};
export default Footer;
