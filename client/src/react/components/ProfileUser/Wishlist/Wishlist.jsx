import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeFavorited } from "../../../../redux/actions-types";
import Swal from "sweetalert2";
import s from "./Wishlist.module.css";

export default function Wishlist() {
	const dispatch = useDispatch();

	const { Products } = useSelector((state) => state.userData);
	const user = useSelector((state) => state.userData);

	const handleWishlist = (e) => {
		e.preventDefault();

		dispatch(
			changeFavorited(
				user.username,
				{
					productId: Number(e.target.id),
					action: "remove",
					token: user.token,
				},
				user.token,
			),
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
			title: "Producto eliminado de Favoritos",
		});
	};

	return (
		<>
			<h1 className={s.title}>Lista de deseos</h1>
			{!Products.length ? (
				<div className={s.container}>
					No hay productos en tu lista de deseos
				</div>
			) : (
				<div className={s.container}>
					{Products?.map((el) => {
						return (
							<div key={el.id} className={s.productContainer}>
								<NavLink to={`/detail/${el.id}`}>
									<img src={`https://${el.image}`} alt={el.name} />
									<h3>{el.name}</h3>
									{el.isOffertPrice ? (
										<div>
											<span>Precio anterior: </span>
											<s>{el.previousPrice}</s>
											<br />
											<span>Precio actual: {el.currentPrice}</span>
										</div>
									) : (
										<p>Precio: ${el.currentPrice}</p>
									)}
								</NavLink>
								<div
									className={s.deleteButton}
									id={el.id}
									onClick={handleWishlist}
								>
									ELIMINAR
								</div>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}
