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
	const [isAdmin, setIsAdmin] = useState("");

	const username = location.pathname.split("/")[3];
	const userData = useSelector((state) => state.userData);

	const clientDetail = useSelector((state) => state.clientDetail);

	useEffect(() => {
		dispatch(getClientDetail(userData.token, username));

		if (clientDetail.Role && clientDetail.Role.name === "admin") {
			setIsAdmin("admin");
		} else {
			setIsAdmin("client");
		}

		// if (Role.name === "admin") setIsAdmin(true);
	}, [dispatch]);

	const handleAdminRole = (e) => {
		if (e.target.checked) {
			setIsAdmin((isAdmin) => (isAdmin = "admin"));
		} else {
			setIsAdmin((isAdmin) => (isAdmin = "client"));
		}
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
		<div>
			<h1>Detalle del cliente</h1>
			<p>
				<span>Es administrador? </span>
				<input
					type="checkbox"
					value={isAdmin}
					checked={isAdmin === "admin" ? true : false}
					onChange={handleAdminRole}
				/>
				{/* <button onClick={handleSubmit}>Enviar</button> */}
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
	);
}
