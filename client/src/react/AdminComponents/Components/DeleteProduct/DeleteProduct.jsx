import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteProduct } from "../../../../redux/actions-types";
import back from "../../../components/svg/volver-flecha.png";
import style from "./DeleteProduct.module.css";
import alert from "../../../components/svg/advertencia.png";
import Swal from 'sweetalert2'

export default function DeleteProduct() {
	const { productId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { token } = useSelector((state) => state.userData);

	const handleClickSi = (event) => {
		event.preventDefault();
		dispatch(deleteProduct(productId, token));
		Swal.fire(
			'Producto eliminado exitosamente!',
			'',
			'success'
		  )
		navigate("/admin/allproducts");
	};

	return (
		<div className={style.container}>
			<div className={style.imgContainer}>
				<NavLink to={`/admin/allproducts`} style={{ textDecoration: "none" }}>
					<img src={back} alt='Img back' className={style.img} />
				</NavLink>
			</div>
			<div className={style.confirmation}>
				<h2>Desea eliminar este producto?</h2>
				<div>
					<img src={alert} alt='Img alert' className={style.imgAlert} />
					<h5>ADVERTENCIA: Los datos no podrán recuperarse.</h5>
				</div>
				<div>
					<button onClick={(e) => handleClickSi(e)} className={style.buttons}>
						Confirmar
					</button>
					<NavLink to={`/admin/allproducts`} style={{ textDecoration: "none" }}>
						<button className={style.buttons}>Cancelar</button>
					</NavLink>
				</div>
			</div>
		</div>
	);
}
