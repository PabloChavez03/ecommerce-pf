import React from "react";
import style from "./styles/Header.module.css";

const Header = () => {
	return (
		<div className={style.headerContainer}>
			<h2>CLOTHES 22</h2>
			<button className={style.headerButton}>VER MI TIENDA</button>
		</div>
	);
};

export default Header;
