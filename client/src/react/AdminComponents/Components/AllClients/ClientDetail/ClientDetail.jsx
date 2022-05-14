import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import {
	getClientDetail,
	resetClientDetail,
	updateClientInfo,
} from "../../../../../redux/actions-types";

import s from "./ClientDetail.module.css";

export default function ClientDetail() {
	const location = useLocation();
	const dispatch = useDispatch();

	const username = location.pathname.split("/")[3];
	const userData = useSelector((state) => state.userData);
	const clientDetail = useSelector((state) => state.clientDetail);

	let isAdmin = false;
	if (clientDetail.Role?.name === "admin") isAdmin = true;

	useEffect(() => {
		dispatch(getClientDetail(userData.token, username));

		return () => {
			dispatch(resetClientDetail());
		};
	}, []);

	const handleRol = (e) => {
		e.preventDefault();

		if (userData.username === clientDetail.user_name) {
			Swal.fire(
				'No puedes cambiar tus propios permisos!',
				'',
				'success'
			  )
			return;
		}

		dispatch(
			updateClientInfo(userData.token, {
				user_name: username,
				rol: isAdmin !== true ? "admin" : "client",
			}),
		);

		dispatch(resetClientDetail());
		dispatch(getClientDetail(userData.token, username));
	};

	// console.log(isAdmin);
	// console.log(Role)
	// const handleSubmit = (e) => {
	// 	// dispatch(delClientDetail());
	// 	dispatch(
	// 		updateUserInfo(username, userData.token, {
	// 			rol: isAdmin,
	// 		}),
	// 	);
	// };

	return (
		<div className={s.container}>
			<h1>Detalle del cliente</h1>
			<div className={s.infoContainer}>
				<p>
					<span>Rol: </span>
					{/* <input
						type="checkbox"
						value={isAdmin}
						checked={isAdmin === "admin" ? true : false}
						onChange={handleAdminRole}
					/> */}
					{/* <button onClick={handleSubmit}>Enviar</button> */}
					<input
						disabled
						type="text"
						value={isAdmin === true ? "Administrador" : "Cliente"}
					/>
					<button onClick={handleRol}>Cambiar</button>
					<br />
					<i>Adminsitrador / Cliente</i>
					{/* {clientDetail.Role?.name === "admin" ? "Administrador" : "Cliente"} */}
				</p>
				<p>
					<span>Legajo: </span>
					{clientDetail.legajo_user}
				</p>
				<p>
					<span>Nombre de usuario: </span>
					{clientDetail.user_name}
				</p>
				<p>
					<span>Nombre: </span>
					{clientDetail.name}
				</p>
				<p>
					<span>Apellido: </span>
					{clientDetail.lastname}
				</p>
				<p>
					<span>DNI: </span>
					{clientDetail.dni_client}
				</p>
				<p>
					<span>E-mail: </span>
					{clientDetail.email}
				</p>
				<p>
					<span>Phone: </span>
					{clientDetail.phone}
				</p>
				<p>
					<span>Dirección: </span>
					{clientDetail.address}
				</p>
			</div>
		</div>
	);
}
