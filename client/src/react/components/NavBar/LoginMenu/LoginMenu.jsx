import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./LoginMenu.module.css";

import { useNavigate } from "react-router-dom";
import { loggedOut } from "../../../../redux/actions-types";

const LoginMenu = ({ setLoginMenu }) => {
	const { username, rol, legajo } = useSelector((state) => state.userData);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickLoggedOut = (e) => {
		e.preventDefault();
		dispatch(loggedOut());
		setLoginMenu(false);
		alert("Sesión cerrada exitosamente!");
		navigate("/");
	};

	return (
		<div className={style.menuLoginContainer}>
			{username ? (
				<div className={style.menuLogin}>
					<h3 className={style.menuLoginTitle}>Hola, {username}</h3>

					<ul className={style.menuLoginListContainer}>
						<NavLink
							to={`/user`}
							className={style.menuLoginItem}
						>
							Mi perfil
						</NavLink>
						{rol === "admin" && (
							<NavLink to={"/admin"} className={style.menuLoginItem}>
								Panel de administrador
							</NavLink>
						)}
					</ul>

					<button
						className={style.menuLoginButton}
						onClick={(e) => handleClickLoggedOut(e)}
					>
						Cerrar Sesión
					</button>
				</div>
			) : (
				<div className={style.menuLogout}>
					<h3 className={style.menuLoginTitle}>Hola</h3>
					<p className={style.menuLogoutText}>
						Actualmente estas como invitado
					</p>
					<NavLink to={"/login"} className={style.menuLoginButton}>
						Ingresa a tu cuenta
					</NavLink>
				</div>
			)}
		</div>
	);
};

export default LoginMenu;
