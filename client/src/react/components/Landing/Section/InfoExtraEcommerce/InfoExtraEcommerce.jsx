import React from "react";
import style from "./InfoExtraEcommerce.module.css";
import img1 from "./assets/tarjeta-de-credito.png";
import img2 from "./assets/abrir-caja.png";
import img3 from "./assets/medalla.png";
import img4 from "./assets/proteger.png";

const InfoExtraEcommerce = () => {
	return (
		<div className={style.infoExtraContainer}>
			<div className={style.infoExtra}>
				<img src={img1} alt='' className={style.infoExtraIcon} />
				<h3>
					Medios <br /> de pago
				</h3>
			</div>
			<div className={style.infoExtra}>
				<img src={img2} alt='' className={style.infoExtraIcon} />
				<h3>
					Politica de <br /> devolucion
				</h3>
			</div>
			<div className={style.infoExtra}>
				<img src={img3} alt='' className={style.infoExtraIcon} />
				<h3>
					Garantía <br /> asegurada
				</h3>
			</div>
			<div className={style.infoExtra}>
				<img src={img4} alt='' className={style.infoExtraIcon} />
				<h3>
					Compra <br /> segura
				</h3>
			</div>
		</div>
	);
};

export default InfoExtraEcommerce;
