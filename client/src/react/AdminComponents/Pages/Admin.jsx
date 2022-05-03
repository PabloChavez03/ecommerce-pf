import React from "react";
import Header from "../Components/Header";
import NavAdmin from "../Components/NavAdmin";
import style from "./styles/Admin.module.css";
import { Routes, Route } from "react-router-dom";

const Admin = () => {
	return (
		<div>
			<Header />
			<div className={style.mainContainer}>
				<div className={style.sectionNavContainer}>
					<NavAdmin />
				</div>
				<div className={style.sectionInfoContainer}>
					<Routes>
						<Route path={"/"} element={<p>home del admin</p>} />
						<Route path={"saludo"} element={<p>hola</p>} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default Admin;
