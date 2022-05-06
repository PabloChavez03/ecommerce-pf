import React from "react";
import style from "./styles/NavAdmin.module.css";
import { NavLink } from "react-router-dom";

const NavAdmin = () => {
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
				</ul>
			</nav>
		</>
	);
};

export default NavAdmin;
