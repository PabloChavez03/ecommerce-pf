import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import style from "./ProfileUser.module.css";

import { loggedOut, updateUserInfo, UserLogin } from "../../../redux/actions-types";

export default function ProfileUser() {
	const dispatch = useDispatch();

	const userData = useSelector((state) => state.userData);
	const [user, setUser] = useState({
		username: null,
		password: null,
		dni: null,
		email: null,
		address: null,
		name: null,
		lastname: null,
		phone: null,
	});

	useEffect(() => {
		setUser({
			username: userData.username,
			password: userData.password,
			dni: userData.dni,
			email: userData.email,
			address: userData.address,
			name: userData.name,
			lastname: userData.lastname,
			phone: userData.phone,
		});
	}, []);

	const isThereChanges =
		userData.username !== user.username ||
		userData.dni !== user.dni ||
		userData.email !== user.email ||
		userData.name !== user.name ||
		userData.address !== user.address ||
		userData.lastname !== user.lastname ||
		userData.phone !== user.phone
			? true
			: false;

	const handleChange = (e) => {
		e.preventDefault();
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUserInfo(userData.username, userData.token, user));
		alert("Los cambios se guardaron");
		dispatch(loggedOut());
		dispatch(
			UserLogin({
				user_name: user.username,
				user_password: user.password,
			}),
		);
	};

	return (
		<>
			<NavBar />
			<div className={style.profileUserContainer}>
				<h1 className={style.titulo}>Mi perfil</h1>

				<div className={style.sections}>
					<fieldset className={style.section}>
						<legend>General</legend>
						<div className={style.infoContainer}>
							<label htmlFor="username">Nombre de usuario: </label>
							<input
								className={style.input}
								id="username"
								name="username"
								type="text"
								value={!user.username ? "" : user.username}
								readOnly
							/>
						</div>
						<div className={style.infoContainer}>
							<label htmlFor="name">Nombre: </label>
							<input
								className={style.input}
								id="name"
								name="name"
								type="text"
								value={!user.name ? "" : user.name}
								onChange={handleChange}
							/>
						</div>
						<div className={style.infoContainer}>
							<label htmlFor="lastname">Apellido: </label>
							<input
								className={style.input}
								id="lastname"
								name="lastname"
								type="text"
								value={!user.lastname ? "" : user.lastname}
								onChange={handleChange}
							/>
						</div>
						<div className={style.infoContainer}>
							<label htmlFor="dni">DNI: </label>
							<input
								className={style.input}
								id="dni"
								name="dni"
								type="number"
								value={!user.dni ? "" : user.dni}
								onChange={handleChange}
							/>
						</div>
					</fieldset>
					<fieldset className={style.section}>
						<legend>Contacto</legend>
						<div className={style.infoContainer}>
							<label htmlFor="phone">Número de celular: </label>
							<input
								className={style.input}
								id="phone"
								name="phone"
								type="text"
								value={!user.phone ? "" : user.phone}
								onChange={handleChange}
							/>
						</div>
						<div className={style.infoContainer}>
							<label htmlFor="email">Email: </label>
							<input
								className={style.input}
								id="email"
								name="email"
								type="text"
								value={!user.email ? "" : user.email}
								onChange={handleChange}
							/>
						</div>
						<div className={style.infoContainer}>
							<label htmlFor="address">Dirección de residencia: </label>
							<input
								className={style.input}
								id="address"
								name="address"
								type="text"
								value={!user.address ? "" : user.address}
								onChange={handleChange}
							/>
						</div>
					</fieldset>
				</div>
				<button className={style.button} disabled={!isThereChanges} onClick={(e) => handleSubmit(e)}>
					Guardar cambios
				</button>
			</div>
		</>
	);
}

// !address: null
// !dni: null
// !email: null
// isRegistered: true
// !lastname: null
// legajo: "312312"
// !name: null
// password: "321"
// !phone: null
// rol: "client"
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiMDMzZWI4ODQtNDA1OS00NTUzLWJhNDktZWNlYzQxNTg3NTE4IiwidXNlcm5hbWUiOiJjYiIsImlhdCI6MTY1MTk5MDU1NX0.FixRY6TSOSL4lbxLoAR8qsvh0zy3mNrm5YYp6Vn1MBY"
// username: "cb"
