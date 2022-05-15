import React from "react";
import { NavLink } from "react-router-dom";
import css from "./HomeUser.module.css";
import Swal from 'sweetalert2'

export default function HomeUser() {
  const handleClickConstruction = (e) => {
    e.preventDefault();
    Swal.fire(
      'Funcionalidad en desarrollo!',
      '',
      'success'
    )
  };

  return (
    <div className={css.container}>
      <NavLink to={"/user/profile"}>
        <button className={css.item}>MI PERFIL</button>
      </NavLink>
      <NavLink to={"/user/orders"}>
        <button className={css.item}>MIS COMPRAS</button>
      </NavLink>
      <NavLink to={"/user/reviews"}>
        <button className={css.item}>MIS RESEÑAS</button>
      </NavLink>
      <button className={css.item} onClick={(e) => handleClickConstruction(e)}>
        MIS FAVORITOS
      </button>
    </div>
  );
}
