import React from "react";
import { NavLink } from "react-router-dom";
import style from './CardAdmin.module.css';
import tachito from './images/eliminar.png';
import edit from './images/editar.png'

export default function CardAdmin({ name, gender, currentPrice, id, isInStock }) {
  return (
    <div className={style.cardContainer}>
        <h4>{name}</h4>
        <h4>$ {currentPrice}</h4>
        <h4>En stock? {isInStock?"Si" : "No"}</h4>
        <div>
          <NavLink to={`/admin/modification/${id}`} style={{ textDecoration: "none" }}>
        
        <img className={style.btn} src={edit} alt="edit" />
      </NavLink>
      <NavLink to={`/admin/delete/${id}`} style={{ textDecoration: "none" }}>
        <img className={style.btn} src={tachito} alt="eliminar" />
      </NavLink>
        </div>
      
    </div>
  );
}
