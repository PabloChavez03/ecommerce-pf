import React, { useRef } from "react";
import { useSelector } from "react-redux";
import css from "./OrderDetail.module.css";
import downlowad from "../../../svg/archivo.png";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";

export default function OrderDetail() {
	const navigate = useNavigate();
	const { payment_id } = useParams();
	const allOrdersClientes = useSelector((state) => state.allOrdersClientes);
	const order = allOrdersClientes?.find((e) => Number(e.payment_id) === Number(payment_id));
	const pdfDownload = useRef(null);
	const handleClose = () => {
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
			<div className={css.ovelayClose} onClick={() => handleClose()}></div>
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
							<h4>{order.payment_id}</h4>
						</div>

						<div>
							<h3>Estado : </h3>
							<h4>{order.status}</h4>
						</div>

						<div>
							<h3>Email: </h3>
							<h4>{order.email}</h4>
						</div>

						<div>
							<p>Por este medio seran suministrados los siguientes productos</p>
						</div>
						<div className={css.productContainer}>
							<div className={css.productName}>
								<p>
									<b>NOMBRE</b>
								</p>
								{order.orderDetails.map((e) => {
									return (
										<div key={e.brandSize + e.id + e.name}>
											<p> {e.name}</p>
										</div>
									);
								})}
							</div>

							<div className={css.product}>
								<p>
									<b>COLOR</b>{" "}
								</p>
								{order.orderDetails.map((e) => {
									return (
										<div key={e.brandSize + e.id + e.color}>
											<p>{e.color}</p>
										</div>
									);
								})}
							</div>

							<div className={css.product}>
								<p>
									<b>CANTIDAD</b>
								</p>
								{order.orderDetails.map((e) => {
									return (
										<div key={e.brandSize + e.id + e.quantity}>
											<p>{e.quantity}</p>
										</div>
									);
								})}
							</div>

							<div className={css.product}>
								<p>
									<b>PRECIO</b>
								</p>
								{order.orderDetails.map((e) => {
									return (
										<div key={e.brandSize + e.id + e.currentPrice}>
											<p>${e.currentPrice}</p>
										</div>
									);
								})}
							</div>
						</div>

						<h1>Total: ${order.total}</h1>
					</div>

					<NavLink to={"/user/orders"} style={{ textDecoration: "none" }}>
						<span className={css.x}>X</span>
					</NavLink>
				</div>

				<div className={css.containerImg}>
					<img
						src={downlowad}
						alt='download pdf'
						onClick={(e) => handleClickDownload(e)}
						className={css.imgDownload}
					/>
				</div>
			</div>
		</div>
	);
}