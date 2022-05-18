import React, { useEffect } from "react";
import TitleSection from "../TitleSection/TitleSection";
import style from "./NewsWomen.module.css";
import Slider from "../../../CategorySlider/Slider/Slider";
import { getAllProducts } from "../../../../../redux/actions-types";
import { useDispatch, useSelector } from "react-redux";
import CardNews from "../CardNews/CardNews";
import { NavLink } from "react-router-dom";

const NewsWomen = () => {
	let obj = {
		name: "Women",
		img: [
			"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw0bdf18a6/1_front_750/00451661-01.jpg",
			"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw260e4330/2_side_750/00451661-01.jpg",
			"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwb0207f4e/3_back_750/00451661-01.jpg",
			"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwad82935d/4_full_750/00451661-01.jpg",
		],
	};

	const dispatch = useDispatch();
	const allProducts = useSelector((state) => state.productsAdmin);

	let productsFiltered = allProducts.filter((item) => item?.Category?.genre === "women")?.slice(2, 6);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div className={style.sectionNewWomen}>
			<TitleSection title={"News Women"} />

			<div className={style.sectionNewWomenItems}>
				<div className={style.productsNewWomenContainer}>
					{productsFiltered?.map((product, index) => {
						return (
							<div key={index}>
								<NavLink to={`/detail/${product.id}`} className={style.cardProductWomen}>
									<CardNews
										id={product.id}
										name={product.name}
										image={product.image}
										isOffertPrice={product.isOffertPrice}
										previousPrice={product.previousPrice}
										currentPrice={product.currentPrice}
										color={product.color}
										variants={product.variants}
									/>
								</NavLink>
							</div>
						);
					})}
				</div>

				<div className={style.sliderNewWomenContainer}>
					<Slider gender={obj.name} category={obj} className={style.sliderNewWomen} />
				</div>
			</div>
		</div>
	);
};

export default NewsWomen;
