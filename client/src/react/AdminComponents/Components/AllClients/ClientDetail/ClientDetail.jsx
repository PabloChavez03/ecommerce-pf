import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
	getClientDetail,
	updateUserInfo,
	UserLogin,
} from "../../../../../redux/actions-types";

export default function ClientDetail() {
	const location = useLocation();
	const dispatch = useDispatch();
	const [isAdmin, setIsAdmin] = useState(false);

	const username = location.pathname.split("/")[3];
	const userData = useSelector((state) => state.userData);

	const {
		Role,
		legajo_user,
		name,
		lastname,
		dni_client,
		email,
		phone,
		address,
		user_name,
	} = useSelector((state) => state.clientDetail);

	useEffect(() => {
		dispatch(getClientDetail(userData.token, username));

		if (Role.name === "admin") setIsAdmin(true);
	}, []);

	const handleAdminRole = (e) => {
		setIsAdmin(!isAdmin);
	};

	const handleSubmit = (e) => {
		dispatch(
			updateUserInfo(username, userData.token, {
				rol: !isAdmin ? "client" : "admin",
			}),
		);

		// dispatch(
		// 	UserLogin({
		// 		user_name: userData.user_name,
		// 		user_password: userData.user_password,
		// 	}),
		// );
	};

	return (
		<div>
			<h1>Detalle del cliente</h1>
			<p>
				<span>Es administrador? </span>
				<input
					type="checkbox"
					value={isAdmin}
					checked={isAdmin}
					onChange={handleAdminRole}
				/>
				<button onClick={handleSubmit}>Enviar</button>
			</p>
			<p>
				<span>Legajo: </span>
				{legajo_user}
			</p>
			<p>
				<span>Nombre de usuario: </span>
				{user_name}
			</p>
			<p>
				<span>Nombre: </span>
				{name}
			</p>
			<p>
				<span>Apellido: </span>
				{lastname}
			</p>
			<p>
				<span>DNI: </span>
				{dni_client}
			</p>
			<p>
				<span>E-mail: </span>
				{email}
			</p>
			<p>
				<span>Phone: </span>
				{phone}
			</p>
			<p>
				<span>Dirección: </span>
				{address}
			</p>
		</div>
	);
}
