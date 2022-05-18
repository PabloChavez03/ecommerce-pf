import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loggedOut } from "../../../../redux/actions-types";
import style from "./NavUser.module.css";
import Swal from 'sweetalert2'

export default function NavUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickLoggedOut = (e) => {
    e.preventDefault();
    dispatch(loggedOut());
    Swal.fire(
      'Sesión cerrada exitosamente!',
      '',
      'success'
    )
    navigate("/");
  };

  return (
    <>
      <nav className={style.navContainer}>
        <ul className={style.listContainer}>
          <NavLink className={style.navLinkAdmin} to={"/user"}>
            Principal
          </NavLink>
          <NavLink className={style.navLinkAdmin} to={"/user/profile"}>
            Mi perfil
          </NavLink>
          <NavLink className={style.navLinkAdmin} to={"/user/orders"}>
            Historial de compras
          </NavLink>
          <NavLink className={style.navLinkAdmin} to={"/user/reviews"}>
            Mis reseñas
          </NavLink>
          <NavLink className={style.navLinkAdmin} to={"/user"}>
            Mis favoritos
          </NavLink>
          <button
            onClick={(e) => handleClickLoggedOut(e)}
            className={style.navAdminButton}
          >
            Cerrar Sesión
          </button>
        </ul>
      </nav>
    </>
  );
}
