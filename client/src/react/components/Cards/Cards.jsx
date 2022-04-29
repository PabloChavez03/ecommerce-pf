import React from "react";
import { NavLink } from "react-router-dom";
import Construction from "../Construction/Construction";
import css from './Cards.module.css'

export default function Cards({
	name,
	price,
	price_offer,
	default_image,
	id_product,
	is_offer,
}) {
	const handleClickAddCart = (event) => (
		<Construction/> //provisorio hasta que este el carrito
	)
	return (
		<div className={css.container}>
			
			<img src={default_image} alt="Product Img" />
			<div className={css.price}>
				<h3>{price}</h3>
			
			{is_offer ? <h4>{`Precio de oferta $ ${price_offer}`}</h4> : null}
			</div>
			
			<h5 className={css.title}>{name}</h5>
			<NavLink to={`/detail/${id_product}`} style={{ textDecoration: "none" }}>
				<button>Mostrar Detalles</button>
			</NavLink>
			<button onClick={(e)=>handleClickAddCart(e)}>Agregar al carrito</button>
		</div>
	);
}
