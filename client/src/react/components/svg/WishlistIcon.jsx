import React from "react";

import s from "./WishlistIcon.module.css";

function WishlistIcon({ user, productId }) {
	const favorited = user.Products?.some((e) => {
		return e.id === productId;
	});

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={s.svg + " " + (favorited ? s.favorited : "")}
			viewBox="0 0 30 30"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
			/>
		</svg>
	);
}

export default WishlistIcon;
