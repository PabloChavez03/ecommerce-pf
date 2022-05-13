import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "../../../../redux/actions-types";
import alertIcon from "../../svg/advertencia.png";

export default function DeleteReviews({ modalStatus, setModalStatus, id }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickConfirm = (event) => {
		event.preventDefault();
		dispatch(deleteReview(id));
		alert("Reseña eliminada con exito!");
		setModalStatus(!modalStatus);
		navigate("/user/reviews");
	};
	const handleModalStatus = (e) => {
		e.preventDefault();
		setModalStatus(!modalStatus);
	};

	return (
		<div>
			<div>
				<h2>Desea eliminar esta reseña?</h2>
				<div>
					<img src={alertIcon} alt='Img alert' style={{ width: "25px" }} />
					<h5>ADVERTENCIA: Los datos no podrán recuperarse.</h5>
				</div>
				<div>
					<button onClick={(e) => handleClickConfirm(e)}>Confirmar</button>
					<button onClick={(e) => handleModalStatus(e)}>Cancelar</button>
				</div>
			</div>
		</div>
	);
}
