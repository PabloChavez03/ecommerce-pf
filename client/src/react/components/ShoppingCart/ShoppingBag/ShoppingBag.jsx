import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import ProductCardModal from "../CardModal/ProductCardModal";

import axios from "axios";

export default function ShoppingBag() {
	const cartItems = useSelector((state) => state.cartItems);
	let suma = 0;
	let subtotal = cartItems?.forEach((e) => (suma += e.currentPrice));
	let envio = 50;

	const [email, setEmail] = useState("");
	const [linkMP, setLinkMP] = useState("");

	const handleClickSend = (e) => {
		e.preventDefault();
		alert("Funcionalidad en desarrollo!");
	};

	const handlePayment = async (e) => {
		e.preventDefault();
		const { data } = await axios.get(
			"http://localhost:3001/mercadopago/payment",
			{
				params: { cartItems, email, envio },
			},
		);

		console.log(data.init_point);
	};

	return (
		<div>
			<NavBar />
			<h1>Mi Carrito</h1>
			{cartItems.length ? (
				cartItems.map((e) => (
					<ProductCardModal
						id={e.id}
						name={e.name}
						color={e.color}
						price={e.currentPrice}
						image={e.image}
						quantity={e.quantity}
						key={e.id}
					/>
				))
			) : (
				<p>No hay productos en el carrito</p>
			)}
			<h3>Subtotal:</h3>
			<p>${suma}</p>
			<h3>Costo de envío:</h3>
			<p>${envio}</p>
			<h2>Total:</h2>
			<p>${suma + envio}</p>

			<label htmlFor="email">Email: </label>
			<input
				id="email"
				type="email"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<NavLink to={"/pay"}>
				<button onClick={(e) => handlePayment(e)}>Finalizar compra</button>
			</NavLink>
			<br></br>
			<NavLink to={"/"}>
				<button>Seguir comprando</button>
			</NavLink>
		</div>
	);
}
