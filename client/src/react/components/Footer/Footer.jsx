import React from "react";
//import { NavLink } from "react-router-dom";
import instagram from "./images/instagram.png";
import whatsapp from "./images/whatsapp.png";
import about from "./images/informacion.png";
import css from './Footer.module.css'

function Footer() {
  const handleClickButton = (event) => {
    alert("Funcionalidad en desarrollo!");
  };

  return (
    <div className={css.container} >
    
      <img className={css.about} src={about} alt="About" onClick={(e)=>handleClickButton(e)}/>
     
      
      <div className={css.img}>
        <img src={instagram} alt="Instagram" onClick={(e)=>handleClickButton(e)}/>
     
        <img src={whatsapp} alt="Whatsapp" onClick={(e)=>handleClickButton(e)}/>
   
      </div>

    </div>
  );
};
export default Footer;
