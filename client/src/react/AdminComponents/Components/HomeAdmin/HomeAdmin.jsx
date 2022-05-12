import React from "react";
import { NavLink } from "react-router-dom";
import css from "./HomeAdmin.module.css";

export default function HomeAdmin() {
	const handleClickConstruction = (e) => {
		e.preventDefault();
		alert("Funcionalidad en desarrollo!");
	};

	return (
		<div className={css.container}>
			<NavLink to={"/admin/allproducts"}>
				<button className={css.item}>MIS PRODUCTOS</button>
			</NavLink>
			<NavLink to={"/admin/createproduct"}>
				<button className={css.item}>CARGAR PRODUCTOS</button>
			</NavLink>

			<NavLink to={"/admin/clients"}>
				<button className={css.item}>MIS CLIENTES</button>
			</NavLink>

			<NavLink to={"/admin/orders"}>
				<button className={css.item}>MIS ORDENES</button>
			</NavLink>

			<button className={css.item} onClick={(e) => handleClickConstruction(e)}>
				MIS VENTAS
			</button>
		</div>
	);
}
