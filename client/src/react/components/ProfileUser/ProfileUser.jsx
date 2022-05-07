import React from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../../redux/actions-types";
import style from "./ProfileUser.module.css";

export default function ProfileUser() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleClickLoggedOut = (e) => {
		e.preventDefault();
		dispatch(loggedOut());
		alert("Sesión cerrada exitosamente!");
		navigate("/");
	};

	return (
		<div className={style.profileUserContainer}>
			<NavBar />
			<h1>Perfil de usuario.</h1>
			<button onClick={(e) => handleClickLoggedOut(e)}>Cerrar Sesión</button>
		</div>
	);
}
