import React, { useRef } from "react";
import css from "./OrderActual.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	postOrder,
	emptyCart,
	addStock,
} from "../../../../../redux/actions-types";
import download from "../../../svg/archivo.png";
import jsPDF from "jspdf";
function OrderActual() {
	const cartItems = useSelector((state) => state.cartItems);
	const { email } = useSelector((state) => state.userData);
	// const subTotal = useSelector((state) => state.subTotal);
	// console.log(subTotal);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const pdfDownload = useRef(null);
	let suma = 0;
	let subtotal = cartItems?.forEach((e) => (suma += e.currentPrice * e.quantity));
	let envio = 50;

	const params = location.search
		.slice(1)
		.split("&")
		.map((el) => el.split("="));

	const {
		// collection_id,
		// collection_status,
		payment_id,
		status,
		// external_reference,
		// payment_type,
		// merchant_order_id,
		// preference_id,
		// site_id,
		// processing_mode,
		// merchant_account_id,
	} = Object.fromEntries(params);

	let order = {
		payment_id: payment_id,
		orderDetails: cartItems,
		total: suma + envio,
		status: status,
		email: email,
	};

	console.log(status);

	dispatch(postOrder(order));
	// if (status === "failure") {
	// 	dispatch(addStock(cartItems));
	// }

	const handleClose = (e) => {
		e.preventDefault();
		dispatch(emptyCart());
		navigate("/user/orders");
	};

	const handleClickDownload = (e) => {
		const content = pdfDownload.current;
		const doc = new jsPDF();
		doc.html(content, {
			callback: function (doc) {
				doc.save("Order.pdf");
			},
			html2canvas: { scale: 0.3 },
		});
	};

	return (
		<div className={css.overlay}>
			<div className={css.ovelayClose} onClick={(e) => handleClose(e)}></div>
			<div className={css.container1}>
				<div className={css.shoppingOrderContainer}>
					<div className={css.container} ref={pdfDownload}>
						<h1> ORDEN DE COMPRA</h1>

						<div>
							<h2>Empresa: Clothes 22</h2>
						</div>

						<div>
							<h3>CUIT: </h3>
							<h4>30-28111120006-1</h4>
						</div>

						<div>
							<h3>Orden de compra Numero :</h3>
							<h4>{payment_id}</h4>
						</div>

						<div>
							<h3>Estado : </h3>
							<h4>{status}</h4>
						</div>

						<div>
							<h3>Email: </h3>
							<h4>{email}</h4>
						</div>

						<div>
							<p>Por este medio seran suministrados los siguientes productos</p>
						</div>
						<div className={css.productContainer}>
							<div className={css.productName}>
								<p>
									<b>NOMBRE:</b>
								</p>
								{cartItems.map((e) => {
									return (
										<div key={e.brandSize + e.id + e.name}>
											<p> {e.name}</p>
										</div>
									);
								})}
							</div>

							<div className={css.product}>
								<p>
									<b>COLOR:</b>{" "}
								</p>
								{cartItems.map((e) => {
									return (
										<div key={e.brandSize + e.id + e.color}>
											<p>{e.color}</p>
										</div>
									);
								})}
							</div>

							<div className={css.product}>
								<p>
									<b>CANTIDAD:</b>
								</p>
								{cartItems.map((e) => {
									return (
										<div key={e.brandSize + e.id + e.quantity}>
											<p>{e.quantity}</p>
										</div>
									);
								})}
							</div>

							<div className={css.product}>
								<p>
									<b>PRECIO:</b>
								</p>
								{cartItems.map((e) => {
									return (
										<div key={e.brandSize + e.id + e.currentPrice}>
											<p>{e.currentPrice}</p>
										</div>
									);
								})}
							</div>
						</div>

						<h1>Total: ${suma + envio}</h1>
					</div>
					<span onClick={(e) => handleClose(e)} className={css.x}>
						X
					</span>
				</div>
				<div className={css.containerImg}>
					<img
						src={download}
						alt="download pdf"
						onClick={(e) => handleClickDownload(e)}
						className={css.imgDownload}
					/>
				</div>
			</div>
		</div>
	);
}

export default OrderActual;
