import React, { useEffect } from "react";
import styles from "./CardDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../../redux/actions-types";
import Card from "./Card";

export default function CardDetail() {
	const dispatch = useDispatch();
	const {productId} = useParams();
	console.log(productId)
	
	useEffect(() => {
        dispatch(getDetails(productId))
    }, [dispatch, productId]);

	const productDetail = useSelector((state)=>state.details);
	console.log(productDetail)
	return (
		<div>
		{
		productDetail.name?
		<div>
		<Card
		id={productDetail.id}
		name={productDetail.name}
		description={productDetail.description}
		gender={productDetail.gender}
		brand={productDetail.brand}
		images={productDetail.images}
		previousPrice={productDetail.previousPrice}
		isOffertProduct={productDetail.isOffertProduct}
		currentPrice={productDetail.currentPrice}
		variants={productDetail.variants}
		/>
		</div> : <h1>Loading...</h1>
		
	}
	</div>
	)
}