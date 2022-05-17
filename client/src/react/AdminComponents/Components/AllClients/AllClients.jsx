import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { getAllClients, resetAllClients } from "../../../../redux/actions-types";

import s from "./allClients.module.css";

export default function AllClients() {
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.userData);

	useEffect(() => {
		dispatch(getAllClients(token));

		return () => {
			dispatch(resetAllClients());
		};
	}, []);

	const allClients = useSelector((state) => state.allClients);
	return (
		<div className={s.container}>
			<h1>Todos mis clientes</h1>
			<div className={s.cardsContainer}>
				{allClients.map((client) => {
					return (
						<div key={client.user_name} className={s.card}>
							<NavLink to={`/admin/clients/${client.user_name}`}>
								<h3 className={s.name}>
									{client.name && client.lastname
										? `${client.name} ${client.lastname}`
										: client.name
										? client.name
										: client.user_name}
								</h3>
							</NavLink>
							<p>
								<span className={s.tag}>Nombre de usuario:</span> {client.user_name}
							</p>
							<p>
								<span className={s.tag}>DNI:</span> {client.dni_client}
							</p>
							<p>
								<span className={s.tag}>Direccion:</span> {client.address}
							</p>
							<p>
								<span className={s.tag}>E-mail:</span> {client.email}
							</p>
							<p>
								<span className={s.tag}>Celular:</span> {client.phone}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
