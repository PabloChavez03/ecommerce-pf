import React from "react";
import DeleteReviews from "../../../ProfileUser/DeleteReviews/DeleteReviews";
import style from "./ShowReviewsModalDelete.module.css";

const ShowReviewsModalDelete = ({ modalStatus, setModalStatus }) => {
	const handleModalStatus = () => {
		setModalStatus(!modalStatus);
	};
	return (
		<div className={style.reviewsModalDeleteOverlay}>
			<div
				className={style.reviewsModalOverlayClose}
				onClick={handleModalStatus}
			></div>
			<div className={style.reviewsModalDeleteContainer}>
				<DeleteReviews
					modalStatus={modalStatus}
					setModalStatus={setModalStatus}
				/>
				<span
					className={style.reviewsModalDeleteTitle}
					onClick={handleModalStatus}
				>
					X
				</span>
			</div>
		</div>
	);
};

export default ShowReviewsModalDelete;
