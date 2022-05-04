import React from "react";
import style from "./styles/Header.module.css";

const HeaderAdmin = () => {
	return (
		<>
			<header className={style.headerContainer}>
				<h2>CLOTHES 22</h2>
				<button className={style.headerButton}>VER MI TIENDA</button>
			</header>
		</>
	);
};

export default HeaderAdmin;
