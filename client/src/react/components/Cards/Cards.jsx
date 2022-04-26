import React from "react";
import { NavLink } from "react-router-dom";

export default function Cards({
	name,
	originalprice,
	promotionprice,
	image,
	id,
	ispromotion,
}) {
	return (
		<div>
			<h3>{name}</h3>s
			<img src={image} alt="Product Img" />
			<h5>{`$ ${originalprice}`}</h5>
			{ispromotion ? <h5>{`$ ${promotionprice}`}</h5> : null}
			<NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
				<button>Mostrar Detalles</button>
			</NavLink>
			<button>Agregar al carrito</button>
		</div>
	);
}
