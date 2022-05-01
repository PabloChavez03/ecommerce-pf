import React from "react";
import { NavLink } from "react-router-dom";
import instagram from "./images/instagram.png";
import whatsapp from "./images/whatsapp.png";

function Footer() {
  const handleClickButton = (event) => {
    alert("Funcionalidad en desarrollo!");
  };
  
  return (
    <div>
      <NavLink to={"/"}>
        <button>About Us!</button>
      </NavLink>
      {/* <NavLink to={"/construction"}> */}
        <img src={instagram} alt="Instagram" onClick={(e)=>handleClickButton(e)}/>
      {/* </NavLink>
      <NavLink to={"/construction"}> */}
        <img src={whatsapp} alt="Whatsapp" onClick={(e)=>handleClickButton(e)}/>
      {/* </NavLink> */}
    </div>
  );
};

export default Footer;
