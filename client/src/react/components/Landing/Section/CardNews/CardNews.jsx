import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFavorited } from "../../../../../redux/actions-types/index";
import Swal from "sweetalert2";
import WishlistIcon from "../../../svg/WishlistIcon";

import style from "./CardNews.module.css";

export default function CardNews({
	id,
	name,
	image,
	isOffertPrice,
	previousPrice,
	currentPrice,
	variants,
	color,
}) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userData);

	const favorited = user.Products?.some((e) => {
		return e.id === id;
	});

	const handleWishlist = (e) => {
		e.preventDefault();

		if (favorited) {
			dispatch(
				changeFavorited(
					user.username,
					{ productId: id, action: "remove", token: user.token },
					user.token
				)
			);
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener("mouseenter", Swal.stopTimer);
					toast.addEventListener("mouseleave", Swal.resumeTimer);
				},
			});

			Toast.fire({
				icon: "success",
				title: "Producto quitado de Favoritos",
			});
		} else {
			dispatch(
				changeFavorited(
					user.username,
					{ productId: id, action: "add", token: user.token },
					user.token
				)
			);

			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener("mouseenter", Swal.stopTimer);
					toast.addEventListener("mouseleave", Swal.resumeTimer);
				},
			});

			Toast.fire({
				icon: "success",
				title: "Producto agregado a Favoritos",
			});
		}
	};

	return (
		<div className={style.container}>
			<div hidden={!user.username} className={style.addWishlist} onClick={handleWishlist}>
				<WishlistIcon user={user} productId={id} />
			</div>
			<img src={`https://${image}`} alt='Product Img' />
			<div className={style.price}>
				<h3>{isOffertPrice ? previousPrice : `$ ${currentPrice} `}</h3>
				{isOffertPrice ? <h4>{`Precio de oferta $ ${currentPrice}`}</h4> : null}
			</div>
			<h5 className={style.title}>{name}</h5>
		</div>
	);
}
