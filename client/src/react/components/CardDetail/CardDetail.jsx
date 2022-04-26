import React, { useState } from "react";

export default function CardDetail({
	image,
	name,
	price,
	variants,
	stock,
	reviews,
	likes,
	relatedProducts,
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
				<p>{price}</p>
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

			<div>Reviews</div>

			<div>
				<h2>Productos relacionados</h2>
				<div></div>
			</div>
		</div>
	);
}
