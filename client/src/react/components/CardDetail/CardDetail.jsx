import React, { useEffect } from "react";
//import style from "./CardDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../../redux/actions-types";
import NavBar from "../NavBar/NavBar";
import Card from "./Card";
import style from "./CardDetail.module.css";

export default function CardDetail() {
	const dispatch = useDispatch();
	const { productId } = useParams();

	useEffect(() => {
		dispatch(getDetails(productId));
	}, [dispatch, productId]);
	

	const productDetail = useSelector((state) => state.details);
	return (
		<div>
			<NavBar />
			{productDetail.name ? (
					<Card
						id={productDetail.id}
						name={productDetail.name}
						description={productDetail.description}
						gender={productDetail.gender}
						brandName={productDetail.brandName}
						images={productDetail.images}
						previousPrice={productDetail.previousPrice}
						isOffertProduct={productDetail.isOffertProduct}
						currentPrice={productDetail.currentPrice}
						color={productDetail.color}
						variants={productDetail.variants}
						info={productDetail.info}
					/>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
}
