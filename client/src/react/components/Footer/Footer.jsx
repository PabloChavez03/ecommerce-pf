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
        <NavLink to="https://www.instagram.com/soyhenry_ok/">
          <img src={instagram} alt="Instagram"/>
        </NavLink>
        <NavLink to="https://api.whatsapp.com/send?phone=+51921899526&text=Hola,%20quisiera%20comprar%20una%20prenda%20en%20Clothes%2022">
          <img src={whatsapp} alt="Whatsapp"/>
        </NavLink>
   
      </div>

    </div>
  );
};
export default Footer;
