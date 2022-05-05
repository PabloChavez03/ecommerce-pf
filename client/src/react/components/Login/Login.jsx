import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import style from "./Login.module.css";

const Login = () => {
	const [activeCreate, setActiveCreate] = useState(false);

	const handleChangeActive = (e) => {
		e.preventDefault();
		if (activeCreate) {
			setActiveCreate(false);
		} else {
			setActiveCreate(true);
		}
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
					<form>
						<div className={style.formInputContainer}>
							<label className={style.formLabel}>CORREO ELECTRÓNICO</label>
							<input
								className={style.formInput}
								type='text'
								name='email'
								placeholder='Email'
							/>
						</div>
						<div className={style.formInputContainer}>
							<label className={style.formLabel}>CONTRASEÑA</label>
							<input
								className={style.formInput}
								type='password'
								name='password'
								placeholder='Contraseña'
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
							<form>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CORREO ELECTRÓNICO</label>
									<input
										className={style.formInput}
										type='text'
										name='email'
										placeholder='Email'
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>CONTRASEÑA</label>
									<input
										className={style.formInput}
										type='text'
										placeholder='Contraseña'
									/>
								</div>
								<div className={style.formInputContainer}>
									<label className={style.formLabel}>
										CONFIRMAR CONTRASEÑA
									</label>
									<input
										className={style.formInput}
										type='text'
										placeholder='Repetir contraseña'
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
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Login;
