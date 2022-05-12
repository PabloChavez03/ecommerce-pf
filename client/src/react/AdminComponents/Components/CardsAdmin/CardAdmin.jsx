import React from "react";
import { NavLink } from "react-router-dom";
import style from "./CardAdmin.module.css";
import tachito from "./images/eliminar.png";
import edit from "./images/editar.png";
import stock from "./images/stock.png";
import { useDispatch } from "react-redux";
import { getDetails } from "../../../../redux/actions-types";

export default function CardAdmin({ name, currentPrice, id, isInStock, modalStock, setModalStock }) {
	const dispatch = useDispatch();

	const handleModalStockActive = (e) => {
		dispatch(getDetails(id));
		setModalStock(!modalStock);
	};

	return (
		<div className={style.cardContainer}>
			<h4>{name}</h4>
			<h4>$ {currentPrice}</h4>
			<h4>En stock? {isInStock ? "Si" : "No"}</h4>
			<div>
				<img className={style.btn} src={stock} alt='stock' onClick={handleModalStockActive} />
				<NavLink to={`/admin/modification/${id}`} style={{ textDecoration: "none" }}>
					<img className={style.btn} src={edit} alt='edit' />
				</NavLink>
				<NavLink to={`/admin/delete/${id}`} style={{ textDecoration: "none" }}>
					<img className={style.btn} src={tachito} alt='eliminar' />
				</NavLink>
			</div>
		</div>
	);
}
