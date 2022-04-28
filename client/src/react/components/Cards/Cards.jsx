import React from "react";
import { NavLink } from "react-router-dom";
import Construction from "../Construction/Construction";

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
		<div>
			<h3>{name}</h3>
			<img src={default_image} alt="Product Img" />
			<h5>{`Precio $ ${price}`}</h5>
			{is_offer ? <h5>{`Precio de oferta $ ${price_offer}`}</h5> : null}
			<NavLink to={`/detail/${id_product}`} style={{ textDecoration: "none" }}>
				<button>Mostrar Detalles</button>
			</NavLink>
			<button onClick={(e)=>handleClickAddCart(e)}>Agregar al carrito</button>
		</div>
	);
}
