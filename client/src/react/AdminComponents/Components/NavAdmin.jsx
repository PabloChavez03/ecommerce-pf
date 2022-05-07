import React from "react";
import style from "./styles/NavAdmin.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../../redux/actions-types";

const NavAdmin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleClickLoggedOut = (e) => {
		e.preventDefault();
		dispatch(loggedOut());
		alert("Sesión cerrada exitosamente!");
		navigate("/");
	};

	return (
		<>
			<nav className={style.navContainer}>
				<ul className={style.listContainer}>
					<NavLink className={style.navLink} to={"/admin"}>
						Principal
					</NavLink>
					<NavLink className={style.navLink} to={"/admin/createproduct"}>
						Crear Producto
					</NavLink>
					<NavLink className={style.navLink} to={"/admin/allproducts"}>
						Listado de Productos
					</NavLink>
					<NavLink className={style.navLink} to={"/admin/createadmin"}>
						Crear Administrador
					</NavLink>
					<NavLink className={style.navLink} to={"/admin/clients"}>
						Mis Clientes
					</NavLink>
					<NavLink className={style.navLink} to={"/admin/orders"}>
						Mis Ordenes
					</NavLink>
					<NavLink className={style.navLink} to={"/admin/chatbot"}>
						Chat Bot
					</NavLink>
					<button onClick={(e)=>handleClickLoggedOut(e)}>
						Cerrar Sesión
					</button>
				</ul>
			</nav>
		</>
	);
};

export default NavAdmin;
