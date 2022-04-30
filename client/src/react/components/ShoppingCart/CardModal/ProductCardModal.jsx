import React from "react";
import style from "./ProductCardModal.module.css";

const ProductCardModal = ({ name, color, currentPrice, brandSize, image }) => {
	/** FALTA AGREGAR LOS OTROS DATOS, SOLO ESTOY RENDERIZANDO EL NAME */

	return (
		<div className={style.cardModalContainer}>
			<img className={style.cardModalImg} src={image} alt='imagen_product' />
			<div className={style.cardModalInfoContainer}>
				<p className={style.cardModalTitle}>{name}</p>
				<p>Color: {color}</p>
				<p>Talla: {brandSize}</p>
				<div className={style.cardModalInfoPrice}>
					<p className={style.cardModalInfo}>
						Precio: <span>$ {currentPrice}</span>
					</p>
					<p className={style.cardModalInfo}>
						Cantidad:
						<span>
							<span> - </span>1<span> + </span>
						</span>
					</p>
					<p className={style.cardModalInfo}>
						Total: <span>$</span>
					</p>
				</div>
			</div>

			<span>X</span>
		</div>
	);
};

export default ProductCardModal;
