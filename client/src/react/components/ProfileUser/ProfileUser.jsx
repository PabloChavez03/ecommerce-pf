import React from "react";
import NavBar from "../NavBar/NavBar";
import style from "./ProfileUser.module.css";

export default function ProfileUser() {
	return (
		<div className={style.profileUserContainer}>
			<NavBar />
			<h1>Perfil de usuario.</h1>
		</div>
	);
}
