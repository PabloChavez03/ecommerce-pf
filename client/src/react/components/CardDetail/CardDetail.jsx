import React, { useState } from "react";
import Cards from "../Cards/Cards";
var Carousel = require('react-responsive-carousel').Carousel;

export default function CardDetail({
	ProductImages, // URL
	name,
	price,
	price_offer,
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
				<Carousel>
					{ProductImages.length?ProductImages.map(image => (
						<img src={image} alt="Img Product"/>
					)) : null}
				</Carousel>
				<button>UnCorazon:D</button>
				<h1>{name}</h1>
				{price_offer ? (
					<>
						<p>
							<s>{price}</s>
						</p>
						<strong>{price_offer}</strong>
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
								ofertPrice={el.price_offer}
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
