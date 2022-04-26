import React, { useState } from "react";

import Cards from "../Cards/Cards";

export default function CardDetail({
	image, // URL
	name,
	price,
	salePrice,
	variants,
	stock,
	reviews,
	likes,
	relatedProducts, // Must contain products home information
}) {
	const { colors, sizes } = variants;
	const [quantity, setQuantity] = useState(1);

	const handleQuantity = (e) => {
		e.preventDefault();
		if (e.target.name === "less") setQuantity(quantity - 1);
		if (e.target.name === "more") setQuantity(quantity + 1);
	};

	return (
		<div>
			<div>
				<img src={image} alt={name} />
				<button>UnCorazon:D</button>
				<h1>{name}</h1>
				{salePrice ? (
					<>
						<p>
							<s>{price}</s>
						</p>
						<strong>{salePrice}</strong>
					</>
				) : (
					<p>{price}</p>
				)}
			</div>

			<div>
				<h2>Disponible en</h2>
				{colors.map((el) => el.name)}
			</div>
			<div>
				<h2>Selecciona tu talla</h2>
				{sizes.map((el) => el.name)}
			</div>

			<div>
				<h2>Cantidad</h2>
				<div>
					<button onClick={handleQuantity} name={"less"}>
						-
					</button>
					<span>{quantity}</span>
					<button onClick={handleQuantity} name={"more"}>
						+
					</button>
				</div>
				<h5>Hay {stock} productos en stock</h5>
			</div>

			<div>
				<h2>Reviews</h2>
			</div>

			<div>
				<h2>Productos relacionados</h2>
				<div>
					{relatedProducts.forEach((el) => {
						return (
							<Cards
								name={el.name}
								price={el.price}
								ofertPrice={el.salePrice}
								category={el.category}
								image={el.image}
								id={el.id}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
