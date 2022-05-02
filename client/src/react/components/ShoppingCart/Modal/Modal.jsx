import React from "react";

import { useSelector } from "react-redux";

import ProductCardModal from "../CardModal/ProductCardModal";
import style from "./Modal.module.css";

const Modal = ({ status, setStatus }) => {
	const cartData = useSelector((state) => state.cartItems);
	// const subTotal = useSelector((state) => state.subTotal);

	let subtotalCart = 0
	// console.log(cartData);
	cartData.forEach(function(a){subtotalCart += (a.currentPrice * a.quantity);});
	
	const handleClickBag = (event) => {
		event.preventDefault();
		alert("Funcionalidad en desarrollo!");
	};
	
	return (
		<>
			{status && (
				<div className={style.modalOverlay}>
					<div className={style.modalContainer}>
						<div className={style.modalHeader}>
							<p>CARRITO DE COMPRA</p>
							<span onClick={() => setStatus(false)}>X</span>
						</div>

						<div className={style.modalCartContainer}>
							{cartData &&
								cartData.map((product) => {
									return (
										<div key={product.id}>
											<ProductCardModal
												id={product.id}
												name={product.name}
												price={product.currentPrice}
												color={product.color}
												size={product.brandSize}
												image={product.image}
												quantity={product.quantity}
											/>
										</div>
									);
								})}
						</div>

						{/**Info bottom */}

						<div className={style.saleInfoContainer}>
							<div className={style.saleInfo}>
								<p>SUBTOTAL</p>
								<span>$ {subtotalCart}</span>
							</div>
						</div>

						<div className={style.modalButtonContainer}>
							<button className={style.modalButton} onClick={(e)=>handleClickBag(e)}>
								VER BOLSA DE COMPRAS
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
