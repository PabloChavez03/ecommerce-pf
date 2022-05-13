import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "./Wishlist.module.css";

export default function Wishlist() {
	const dispatch = useDispatch();

	const { Products } = useSelector((state) => state.userData);
	const categories = useSelector((state) => state.categories);

	return (
		<>
			<h1 className={s.title}>Lista de deseos</h1>
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
								<div className={s.category}>
									{categories.map((category) => {
										return category.id === el.CategoryId && category.title;
									})}
								</div>
							</NavLink>
						</div>
					);
				})}
			</div>
		</>
	);
}
