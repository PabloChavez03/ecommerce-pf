import React from "react";
import constructionImage from "./enconstruccion.jpg";
import s from "./Construction.module.css";
import NavBar from "../NavBar/NavBar";

export default function Construction() {
	return (
		<div>
			<NavBar />
			<div className={s.principalDiv}>
				<img
					className={s.imageConstruction}
					src={constructionImage}
					alt='Img Construccion'
				/>
			</div>
		</div>
	);
}
