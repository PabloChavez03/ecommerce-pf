import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import ProductCardModal from "../CardModal/ProductCardModal";
import css from "./ShoppingBag.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { removeStock, addCheckStock, emptyCartCheckStock } from "../../../../redux/actions-types";

export default function ShoppingBag() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cartItems);
	const userData = useSelector((state) => state.userData);

	let suma = 0;
	let subtotal = cartItems?.forEach(
		(e) => (suma += e.currentPrice * e.quantity),
	);
	let envio = 50;

	const [email, setEmail] = useState("");
	useEffect(() => {
	 	
		cartItems?.forEach(e=> dispatch(addCheckStock(e.id)))
		console.log(theStock)
	  
	}, [dispatch])
	

	const validateStock= (cart)=>{
		let goodToGo = true
		cart?.forEach(e=>{
			let aux = theStock.find(s=> s.id === e.id)
			let varIndex = aux.variants.findIndex(variant=> variant.brandSize === e.brandSize)
			if(aux.variants[varIndex].stock < e.quantity){
			goodToGo = false
			return Swal.fire(`El producto "${e.name}" tiene menos stock del que usted desea comprar o se ha quedado sin stock`, "", "error");}
			})
		return goodToGo
	} 


const theStock = useSelector(state => state.cartItemsCheckStock)
	
	const emptyCartCheck = (e)=> {
		dispatch(emptyCartCheckStock())
	}
	
	



	const handlePayment = async (e) => {
		e.preventDefault();

		if (suma === 0) {
			Swal.fire(
				"Debe agregar productos al carrito para continuar!",
				"",
				"success",
			);
			navigate("/");
			return;
		}
		if (userData.rol === "admin") {
			Swal.fire("Un administrador no puede realizar compras!", "", "error");
			return;
		}
		let theRealVal = validateStock(cartItems)
		if(theRealVal&& theRealVal === false){
			return
		}

		const emailRegex = new RegExp(
			/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
		);

		const emailAux = userData.email ? userData.email : email;

		if (!emailRegex.test(emailAux)) {
			alert("Por favor verifique su correo electrónico");
			return;
		}
		if(theRealVal&& theRealVal === true){
			dispatch(removeStock(cartItems));
		}
		
		const { data } = await axios.get("/mercadopago/payment", {
			params: { cartItems, emailAux, envio },
		});
		
		if(theRealVal&& theRealVal === true){
			emptyCartCheck()
		}
		
		
		//generamos nuestra orden de compra
		//cartItems === orderDetails, envio + suma === total, userData.dni_client === dni_client
		if(theRealVal&& theRealVal === true){
			return window.open(data.init_point, "_self");
		}
		
	};

	return (
		<div className={css.container}>
			<div className={css.nav}>
				<NavBar />
			</div>
			<h1 className={css.name}>Mi Carrito</h1>
			<div className={css.modalCartContainer}>
				{cartItems.length ? (
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
				)}
			</div>
			<div className={css.infoCont}>
				<h3>Subtotal:</h3>
				<p>${suma}</p>
				<h3>Costo de envío:</h3>
				<p>${envio}</p>
				<h2>Total:</h2>
				<p>${suma + envio}</p>

				{(userData.email && !userData.email.length) || !userData.email ? (
					<div className={css.mail}>
						<label htmlFor="email">Ingresa un email: </label>
						<br />
						<input
							id="email"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<br />
						<i>Recuerda agregar tu email en tu información de perfil</i>
					</div>
				) : (
					""
				)}
				<br />
				{userData.username ? (
					<>
						<button
							disabled={userData.email || email ? false : true}
							className={css.btn}
							onClick={(e) => handlePayment(e)}
						>
							Ir a pagar
						</button>
					</>
				) : (
					"Inicia sesión para comprar"
				)}

				<br></br>
				<NavLink to={"/"}>
					<button className={css.btn}>Seguir comprando</button>
				</NavLink>
				
			</div>
		</div>
	);
}
