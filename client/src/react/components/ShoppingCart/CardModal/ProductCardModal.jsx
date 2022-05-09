import React, { useEffect } from "react";
import style from "./ProductCardModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
	removeProductFromCart,
	changeCartQuantity,
} from "../../../../redux/actions-types";

const ProductCardModal = ({
	id,
	name,
	color,
	price,
	size,
	image,
	quantity,
	variants,
}) => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cartItems);
	const handleRemove = () => {
		dispatch(removeProductFromCart(id, size));
	};
	const handleQtyChange = (e) => {
		e.preventDefault();
		dispatch(changeCartQuantity(e.target.value, id, size));
	};
	useEffect(() => {}, [cartItems, variants]);

	console.log(variants);
	return (
		<div className={style.cardModalContainer}>
			<img
				className={style.cardModalImg}
				src={"https://" + image}
				alt='imagen_product'
			/>
			<div className={style.cardModalInfoContainer}>
				<p className={style.cardModalTitle}>{name}</p>
				<p>Color: {color}</p>
				<p>Talla: {size}</p>
				<div className={style.cardModalInfoPrice}>
					<p className={style.cardModalInfo}>
						Precio: <span>$ {price?.toFixed(2)}</span>
					</p>
					<p className={style.cardModalInfo}>
						Cantidad:
						<span>
							<button
								className={style.btnMasMenos}
								value={"-"}
								onClick={(e) => handleQtyChange(e)}
							>
								{" "}
								-{" "}
							</button>
							<span className={style.quantity}>{quantity}</span>
							<button
								className={style.btnMasMenos}
								value={"+"}
								onClick={(e) => handleQtyChange(e)}
							>
								{" "}
								+{" "}
							</button>
						</span>
					</p>
					<p className={style.cardModalInfo}>
						Total: <span>$ {(price * quantity).toFixed(2)}</span>
					</p>
				</div>
			</div>

			<span
				onClick={() => handleRemove()}
				className={style.modalCardClose}
			></span>
		</div>
	);
};

export default ProductCardModal;
