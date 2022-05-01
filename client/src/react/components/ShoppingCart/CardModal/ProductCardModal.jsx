import React from "react";
import style from "./ProductCardModal.module.css";

const ProductCardModal = ({
	name,
	color,
	price,
	size,
	image,
	quantity,
	totalPrice,
}) => {
	/** FALTA AGREGAR LOS OTROS DATOS, SOLO ESTOY RENDERIZANDO EL NAME */
	console.log(image);
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
						Precio: <span>$ {price}</span>
					</p>
					<p className={style.cardModalInfo}>
						Cantidad:
						<span>
							<span> - </span>
							{quantity}
							<span> + </span>
						</span>
					</p>
					<p className={style.cardModalInfo}>
						Total: <span>$ {totalPrice}</span>
					</p>
				</div>
			</div>

			<span>X</span>
		</div>
	);
};

export default ProductCardModal;
