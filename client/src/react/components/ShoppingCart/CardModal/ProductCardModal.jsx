import React from "react";
import style from "./ProductCardModal.module.css";

const ProductCardModal = () => {
	return (
		<div className={style.cardModalContainer}>
			<div>imagen</div>
			<div className={style.cardModalInfoContainer}>
				<p className={style.cardModalTitle}>Nombre</p>
				<p>Color: Red</p>
				<p>Talla: XL</p>
				<div className={style.cardModalInfoPrice}>
					<p className={style.cardModalInfo}>
						Precio: <span>$ 300</span>
					</p>
					<p className={style.cardModalInfo}>
						Cantidad:
						<span>
							<span> - </span>1<span> + </span>
						</span>
					</p>
					<p className={style.cardModalInfo}>
						Total: <span>$ 300</span>
					</p>
				</div>
			</div>

			<span>X</span>
		</div>
	);
};

export default ProductCardModal;
