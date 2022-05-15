import React from "react";
import { NavLink } from "react-router-dom";
import css from "./HomeAdmin.module.css";
import Swal from 'sweetalert2'


export default function HomeAdmin() {
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
