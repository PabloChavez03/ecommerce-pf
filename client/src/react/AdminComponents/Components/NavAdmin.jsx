import React from "react";
import style from "./styles/NavAdmin.module.css";
import { NavLink } from "react-router-dom";

const NavAdmin = () => {
	return (
		<>
			<nav className={style.navContainer}>
				<ul className={style.listContainer}>
					<NavLink className={style.navLink} to={"/admin"}>
						Admin
					</NavLink>
					<NavLink className={style.navLink} to={"/admin/producto"}>
						Producto
					</NavLink>
					<NavLink className={style.navLink} to={"/admin/allproducts"}>
						Todos los productos
					</NavLink>
				</ul>
			</nav>
		</>
	);
};

export default NavAdmin;
