import React from "react";
import { NavLink } from "react-router-dom";
import style from "./CardAdmin.module.css";
import tachito from "./images/eliminar.png";
import edit from "./images/editar.png";
import stock from "./images/stock.png";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, deleteProduct } from "../../../../redux/actions-types";
import Swal from 'sweetalert2'

export default function CardAdmin({ name, currentPrice, id, isInStock, modalStock, setModalStock }) {
	const dispatch = useDispatch();

	const { token } = useSelector((state) => state.userData);

	const handleModalStockActive = (e) => {
		dispatch(getDetails(id));
		setModalStock(!modalStock);
	};

	function handleClick (e) {
		e.preventDefault();
		Swal.fire({
            title: '¿Seguro desea eliminar el Producto?',
            text: "Una vez aceptado no se pueden revertir los cambios!",
            icon: 'No',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
				dispatch(deleteProduct(id, token));
              Swal.fire(
                'Confirmado!',
                'Su producto fue eliminado con éxito!',
                'success'
              )
            }
          })
	};

	

	return (
		<div className={style.cardContainer}>
			<h4>{name}</h4>
			<h4>$ {currentPrice}</h4>
			<h4>En stock? {isInStock ? "Si" : "No"}</h4>
			<div>
				<img className={style.btn} src={stock} alt='stock' onClick={handleModalStockActive} />
				<NavLink to={`/admin/modification/${id}`} style={{ textDecoration: "none" }}>
					<img className={style.btn} src={edit} alt='edit' />
				</NavLink>
				{/* <NavLink to={`/admin/delete/${id}`} style={{ textDecoration: "none" }}> */}

					<img className={style.btn} src={tachito} alt='eliminar' onClick={e => handleClick(e)}/>
				{/* </NavLink> */}

				
			</div>
		</div>
	);
}
