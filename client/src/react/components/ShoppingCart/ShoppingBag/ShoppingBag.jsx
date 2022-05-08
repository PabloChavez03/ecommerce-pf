import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import ProductCardModal from "../CardModal/ProductCardModal";
import css from './ShoppingBag.module.css'

import axios from "axios";

export default function ShoppingBag() {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cartItems);
	let suma = 0;
	let subtotal = cartItems?.forEach((e) => (suma += e.currentPrice));
	let envio = 50;

	const [email, setEmail] = useState("");

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

		window.open(data.init_point, "_self");
	};

	return (
		<div className={css.container}>
			<div className={css.nav}><NavBar /></div>
			<h1 className={css.name}>Mi Carrito</h1>
			<div className={css.modalCartContainer}>{cartItems.length ? (
				cartItems.map((e) => (
					<ProductCardModal
						id={e.id}
						name={e.name}
						color={e.color}
						price={e.currentPrice}
						image={e.image}
						size={e.brandSize}
						quantity={e.quantity}
						key={e.id + e.brandSize}
					/>
				))
			) : (
				<p>No hay productos en el carrito</p>
			)}</div>
			<div className={css.infoCont}>
			<h3>Subtotal:</h3>
			<p>${suma}</p>
			<h3>Costo de envío:</h3>
			<p>${envio}</p>
			<h2>Total:</h2>
			<p>${suma + envio}</p>
			
			
				<div className={css.mail}>
				<label htmlFor="email">Email: </label>
			<input
				id="email"
				type="email"
				onChange={(e) => setEmail(e.target.value)}
			/>	
				</div>
			

			<NavLink to={"/pay"}>
				<button className={css.btn} onClick={(e) => handlePayment(e)}>Comprar</button>
			</NavLink>
			<br></br>
			<NavLink to={"/"}>
				<button className={css.btn}>Seguir comprando</button>
			</NavLink>
			</div>
		</div>
	);
}
