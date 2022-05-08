import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import style from "./Login.module.css";
import { useDispatch } from "react-redux";
import { createNewUser, UserLogin } from "../../../redux/actions-types";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [activeCreate, setActiveCreate] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [newUser, setNewUser] = useState({
		phone: "",
		dni_client: "",
		email: "",
		login_name: "",
		login_password: "",
		name: "",
		lastname: "",
		address: "",
		isRegistered: true,
	});

	const [error, setError] = useState({});

	function validate(newUser) {
		let errors = {};
		if (!newUser.name) {
			errors.name = "Es necesario ingresar tu nombre";
		} else {
			errors.name = "good";
		}
		if (errors.name === "good") {
			errors.submit = "we good";
		}
		return errors;
	}

	const handleChangeInputNewUser = (e) => {
		e.preventDefault();
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value,
		});
		setError(
			validate({
				...newUser,
				[e.target.name]: e.target.value,
			}),
		);
	};
	// console.log(newUser);

	const handleChangeActive = (e) => {
		e.preventDefault();
		if (activeCreate) {
			setActiveCreate(false);
		} else {
			setActiveCreate(true);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// setCorrect(true)
		// console.log(newAdmin)
		if (error.submit !== "we good") {
			return;
		}
		dispatch(createNewUser(newUser));
		setNewUser({
			phone: "",
			dni_client: "",
			email: "",
			user_name: "",
			user_password: "",
			name: "",
			lastname: "",
			address: "",
			isRegistered: true,
		});
		alert("sumitie");
		navigate("/user/profile");
	};
	//////////////////////////// LOGIN ///////////////////////
	const [login, setLogin] = useState({
		user_name: "",
		user_password: "",
	});
	const handleChangeInputLogin = (e) => {
		e.preventDefault();
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
		// setLoginError(
		// 	validate({
		// 		...newUser,
		// 		[e.target.name]: e.target.value,
		// 	})
		// );
		console.log(login);
	};
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		// setCorrect(true)
		// console.log(newAdmin)
		// if(error.submit !== 'we good'){ return }
		dispatch(UserLogin(login));
		setLogin({
			user_name: "",
			user_password: "",
		});
		navigate("/");
	};



	const GOOGLE = () => {
		window.open("http://localhost:3001/auth/google", "_self");
	};

	return (
		<>
			<NavBar />
			<div className={style.loginContainer}>
				{/**Ingresando usuario */}
				<div className={style.formLogin}>
					<h2 className={style.loginTitle}>Soy Cliente</h2>
					<p className={style.loginInfoText}>
						Si haz comprado antes en Clothes 22, solo ingresa tu correo
						electrónico y contraseña para acceder a tu cuenta.
					</p>
					<form onSubmit={(e) => handleLoginSubmit(e)}>
						<div className={style.formInputContainer}>
							<label className={style.formLabel}>USUARIO</label>
							<input
								className={style.formInput}
								type="text"
								name="user_name"
								value={login.user_name}
								placeholder="Name"
								onChange={(e) => handleChangeInputLogin(e)}
							/>
						</div>
						<div className={style.formInputContainer}>
							<label className={style.formLabel}>CONTRASEÑA</label>
							<input
								className={style.formInput}
								type="password"
								name="user_password"
								value={login.user_password}
								placeholder="Contraseña"
								onChange={(e) => handleChangeInputLogin(e)}
							/>
						</div>
						<button className={style.formButtonLogin}>INGRESAR</button>
					</form>
				</div>
				{/**Creando usuario */}
				<div className={style.formCreateUser}>
					{activeCreate ? (
						<div className={style.formCreateActive}>
							<h2 className={style.formTitle}>Crear Cuenta</h2>
							<form onSubmit={(e) => handleSubmit(e)}>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>NOMBRE</label>
									<input
										className={style.formInput}
										type="text"
										name="name"
										value={newUser.name}
										placeholder="Nombre"
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								{error.name && <p className={style.error}>{error.name}</p>}
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>APELLIDO</label>
									<input
										className={style.formInput}
										type="text"
										name="lastname"
										value={newUser.lastname}
										placeholder="Apellido"
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>DNI</label>
									<input
										className={style.formInput}
										type="number"
										name="dni_client"
										value={newUser.dni_client}
										placeholder="DNI"
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CORREO ELECTRÓNICO</label>
									<input
										className={style.formInput}
										type="text"
										name="email"
										value={newUser.email}
										placeholder="Email"
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>USUARIO</label>
									<input
										className={style.formInput}
										type="text"
										name="user_name"
										value={newUser.user_name}
										placeholder="Usuario"
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CONTRASEÑA</label>
									<input
										className={style.formInput}
										type="password"
										name="user_password"
										value={newUser.user_password}
										placeholder="Contraseña"
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>
										CONFIRMAR CONTRASEÑA
									</label>
									<input
										className={style.formInput}
										type="password"
										placeholder="Repetir contraseña"
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CELULAR</label>
									<input
										className={style.formInput}
										type="number"
										name="phone"
										value={newUser.phone}
										placeholder="Celular"
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>DIRECCION</label>
									<input
										className={style.formInput}
										type="text"
										name="address"
										value={newUser.address}
										placeholder="Direccion"
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								<button className={style.formButtonCreateActive}>
									CREAR Y CONTINUAR
								</button>
								<button
									className={style.formButtonBack}
									onClick={handleChangeActive}
								>
									VOLVER
								</button>
							</form>
						</div>
					) : (
						<div className={style.formCreateNotActive}>
							<h2>Aún no soy cliente</h2>
							<p>
								Si aún no eres cliente de Clothes 22, regístrate ingresando tu
								correo electrónico y una contraseña.
							</p>
							<h3>Beneficios de crear una cuenta</h3>
							<ul className={style.formListInfoContainer}>
								<li>Finalizar tus pedidos más rápido.</li>
								<li>Consultar tu historial de compras</li>
								<li>Rastrea tus pedidos</li>
							</ul>
							<button
								className={style.formButtonCreateActive}
								onClick={handleChangeActive}
							>
								CREAR CUENTA
							</button>

							<button
								className={`${style.formButtonCreateActive} ${style.google}`}
								onClick={GOOGLE}
							>
								INICIAR CON GOOGLE
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Login;
