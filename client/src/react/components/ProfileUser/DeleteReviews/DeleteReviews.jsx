import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteReview } from "../../../../redux/actions-types";
import alert from "../../svg/advertencia.png";

export default function DeleteReviews({ modalStatus, setModalStatus }) {
	const dispatch = useDispatch();
	const { reviewId } = useParams();
	const navigate = useNavigate();

	const handleClickConfirm = (event) => {
		event.preventDefault();
		dispatch(deleteReview(reviewId));
		alert("Reseña eliminada con exito!");
		navigate("/user/reviews");
	};

	const handleModalStatus = (e) => {
		e.preventDefault();
		setModalStatus(!modalStatus);
	};

	return (
		<div>
			<div>
				<h2>Desea eliminar este producto?</h2>
				<div>
					<img src={alert} alt='Img alert' style={{ width: "25px" }} />
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
