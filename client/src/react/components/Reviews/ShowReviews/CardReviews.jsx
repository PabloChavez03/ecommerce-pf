import React from "react";
import AccountIcon from "../../svg/AccountIcon";
import starBlack from "../images/estrella-transparent.png";
import starGold from "../images/estrella-dorada.png";
import style from "./CardReviews.module.css";
import editIcon from "../../../AdminComponents/Components/CardsAdmin/images/editar.png";
import deleteIcon from "../../../AdminComponents/Components/CardsAdmin/images/eliminar.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CardReviews({
	UserUserName,
	comment,
	calification,
	id,
	modalStatus,
	setModalStatus,
}) {
	const userData = useSelector((state) => state.userData).username;

	const handleModalStatus = () => {
		setModalStatus(!modalStatus);
	};

	return (
		<div className={style.container}>
			<AccountIcon />
			<h4>Usuario:</h4>
			<p>{UserUserName}</p>
			<h4>Comentario:</h4>
			<span>{comment}</span>
			<h4>Calificación:</h4>
			<div className={style.imgContainer}>
				<img
					src={calification >= 1 ? starGold : starBlack}
					alt='star'
					className={style.imgStar}
					name={1}
				/>
				<img
					src={calification >= 2 ? starGold : starBlack}
					alt='star'
					className={style.imgStar}
					name={2}
				/>
				<img
					src={calification >= 3 ? starGold : starBlack}
					alt='star'
					className={style.imgStar}
					name={3}
				/>
				<img
					src={calification >= 4 ? starGold : starBlack}
					alt='star'
					className={style.imgStar}
					name={4}
				/>
				<img
					src={calification >= 5 ? starGold : starBlack}
					alt='star'
					className={style.imgStar}
					name={5}
				/>
				{UserUserName === userData ? (
					<div>
						<NavLink to={`/user/reviews/update/${id}`}>
							<img src={editIcon} alt='Icon Edit' className={style.imgStar} />
						</NavLink>

						<img
							src={deleteIcon}
							alt='Icon Delete'
							className={style.imgStar}
							onClick={handleModalStatus}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}
