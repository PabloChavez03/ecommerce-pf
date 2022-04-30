import React from "react";
import { NavLink } from "react-router-dom";
import Construction from "../Construction/Construction";
import css from './Cards.module.css'

export default function Cards({
	name,
	image,
	id,
	isOffertPrice,
	previousPrice,
	currentPrice,
	brandName
}) {
	return (
		<div className={css.container}>
			
			<img src={image} alt="Product Img" />
			<div className={css.price}>
				<h3>{isOffertPrice?previousPrice:currentPrice}</h3>
			
			{isOffertPrice ? <h4>{`Precio de oferta $ ${currentPrice}`}</h4> : null}
			</div>
			
			<h5 className={css.title}>{name}</h5>
			<h5>{brandName}</h5>
			<NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
				<button>Mostrar Detalles</button>
			</NavLink>
		</div>
	);
}
