import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import style from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, UserLogin, loggedOut, getAllClientsUserEmail } from "../../../redux/actions-types";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Login = () => {
	const [activeCreate, setActiveCreate] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.userData);

	useEffect(() => {
		// console.log(userData);
		if (userData.name === "AxiosError") {
			Swal.fire(
				'Usuario o contraseña incorrecta!',
				'',
				'error'
			  )
			dispatch(loggedOut());
		} else if (userData.username) {
			navigate("/");
		}
	}, [userData, dispatch, navigate]);

	const [newUser, setNewUser] = useState({
		email: "",
		user_name: "",
		user_password: "",
		repeat_password: "",
		name: "",
		isRegistered: true,
	});

	/** Error function validate */

	/** Buscar todos los usuarios y sus email */
	// useEffect(() => {
	// 	dispatch(getAllClientsUserEmail());
	// }, [dispatch]);

	const allClients = useSelector((state) => state.allClientsUserEmail);

	/** fin de busqueda de los usuarios y email */
	const [error, setError] = useState({});

	function validate(newUser) {
		let errors = {};

		let usernameEnUso = allClients.find((client) => client.username === newUser.user_name);
		let emailEnUso = allClients.find((client) => client.email === newUser.email);

		if (!newUser.name) errors.name = "Es necesario ingresar tu nombre";
		if (/[1-9]/.test(newUser.name)) errors.name = "Tu nombre no puede contener numeros";
		if (/[^\w\s]/.test(newUser.name)) errors.name = "Tu nombre no puede contener caracteres especiales";
		if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(newUser.email))
			errors.email = "El correo brindado no es valido";
		if (!newUser.email) errors.email = "Es necesario ingresar tu correo electronico";
		if (emailEnUso) errors.email = "El correo ya esta en uso";
		if (!newUser.user_name) errors.user_name = "Es necesario ingresar tu usuario";
		if (usernameEnUso) errors.user_name = "El nombre de usuario ya esta en uso";
		if (!newUser.user_password) errors.user_password = "Es necesario ingresar tu contraseña";
		if (newUser.repeat_password !== newUser.user_password) errors.repeat_password = "La contraseña no coinciden";

		return errors;
	}
	/** Fin function validate */
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
			})
		);
	};

	const handleChangeActive = (e) => {
		e.preventDefault();
		if (activeCreate) {
			setActiveCreate(false);
		} else {
			dispatch(getAllClientsUserEmail());
			setActiveCreate(true);
		}
	};

	/** Validacion para el boton disabled */
	const [disabledButton, setDisabledButton] = useState(true);

	useEffect(() => {
		if (
			newUser.name === "" ||
			error.hasOwnProperty("name") ||
			error.hasOwnProperty("email") ||
			error.hasOwnProperty("user_name") ||
			error.hasOwnProperty("user_password") ||
			error.hasOwnProperty("repeat_password")
		) {
			setDisabledButton(true);
		} else {
			setDisabledButton(false);
		}
	}, [error, newUser, setDisabledButton]);

	/** Terminando la validacion para el boton disabled */
	/** Crear usuario */
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createNewUser(newUser));
		setNewUser({
			dni_client: Number(""),
			email: "",
			user_name: "",
			user_password: "",
			repeat_password: "",
			name: "",
			isRegistered: true,
		});
		Swal.fire(
            'Usuario creado exitosamente!',
            '',
            'success'
          )
		setActiveCreate(false);
	};

	/**Login */
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
		// console.log(login);
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		setLogin({
			user_name: "",
			user_password: "",
		});
		dispatch(UserLogin(login));

		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
			  toast.addEventListener('mouseenter', Swal.stopTimer)
			  toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		  })
		  
		  Toast.fire({
			icon: 'success',
			title: 'Iniciado sesion con éxito!'
		  })
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
						Si haz comprado antes en Clothes 22, solo ingresa tu correo electrónico y contraseña para acceder a tu
						cuenta.
					</p>
					<form onSubmit={(e) => handleLoginSubmit(e)}>
						<div className={style.formInputContainer}>
							<label className={style.formLabel}>USUARIO</label>
							<input
								className={style.formInput}
								type='text'
								name='user_name'
								value={login.user_name}
								placeholder='Name'
								onChange={(e) => handleChangeInputLogin(e)}
							/>
						</div>
						<div className={style.formInputContainer}>
							<label className={style.formLabel}>CONTRASEÑA</label>
							<input
								className={style.formInput}
								type='password'
								name='user_password'
								value={login.user_password}
								placeholder='Contraseña'
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
										type='text'
										name='name'
										value={newUser.name}
										placeholder='Nombre'
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								{error.name && <p className={style.error}>{error.name}</p>}

								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CORREO ELECTRÓNICO</label>
									<input
										className={style.formInput}
										type='text'
										name='email'
										value={newUser.email}
										placeholder='Email'
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								{error.email && <p className={style.error}>{error.email}</p>}

								<div className={style.formInputContainer}>
									<label className={style.formLabel}>USUARIO</label>
									<input
										className={style.formInput}
										type='text'
										name='user_name'
										value={newUser.login_name}
										placeholder='Usuario'
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								{error.user_name && <p className={style.error}>{error.user_name}</p>}

								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CONTRASEÑA</label>
									<input
										className={style.formInput}
										type='password'
										name='user_password'
										value={newUser.login_password}
										placeholder='Contraseña'
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								{error.user_password && <p className={style.error}>{error.user_password}</p>}

								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CONFIRMAR CONTRASEÑA</label>
									<input
										className={style.formInput}
										type='password'
										name='repeat_password'
										placeholder='Repetir contraseña'
										value={newUser.repeat_password}
										onChange={(e) => handleChangeInputNewUser(e)}
									/>
								</div>
								{error.repeat_password && <p className={style.error}>{error.repeat_password}</p>}

								<button disabled={disabledButton} className={style.formButtonCreateActive}>
									CREAR Y CONTINUAR
								</button>
								<button className={style.formButtonBack} onClick={handleChangeActive}>
									VOLVER
								</button>
							</form>
						</div>
					) : (
						<div className={style.formCreateNotActive}>
							<h2>Aún no soy cliente</h2>
							<p>Si aún no eres cliente de Clothes 22, regístrate ingresando tu correo electrónico y una contraseña.</p>
							<h3>Beneficios de crear una cuenta</h3>
							<ul className={style.formListInfoContainer}>
								<li>Finalizar tus pedidos más rápido.</li>
								<li>Consultar tu historial de compras</li>
								<li>Rastrea tus pedidos</li>
							</ul>
							<button className={style.formButtonCreateActive} onClick={handleChangeActive}>
								CREAR CUENTA
							</button>

							<button className={`${style.formButtonCreateActive} ${style.google}`} onClick={GOOGLE}>
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
