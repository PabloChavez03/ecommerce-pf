import React, { useEffect } from "react";
import TitleSection from "../TitleSection/TitleSection";
import style from "./NewsMen.module.css";
import Slider from "../../../CategorySlider/Slider/Slider";
import { getAllProducts } from "../../../../../redux/actions-types";
import { useDispatch, useSelector } from "react-redux";
import CardNews from "../CardNews/CardNews";
import { NavLink } from "react-router-dom";

const NewsMen = () => {
	let obj = {
		name: "Men",
		img: [
			"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
			"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw334da0a7/2_side_750/00459086-01.jpg",
			"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwa54a165f/3_back_750/00459086-01.jpg",
			"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw26f980c0/4_full_750/00459086-01.jpg",
		],
	};

	const dispatch = useDispatch();
	const allProducts = useSelector((state) => state.productsAdmin);

	let productsFiltered = allProducts?.filter((item) => item.Category?.genre === "men").slice(2, 6);

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div className={style.sectionNewMen}>
			<TitleSection title={"News Men"} />

			<div className={style.sectionNewMenItems}>
				<div className={style.sliderNewMenContainer}>
					<Slider gender={obj.name} category={obj} className={style.sliderNewMen} />
				</div>
				<div className={style.productsMenNewMenContainer}>
					{productsFiltered?.map((product, index) => {
						return (
							<div key={index}>
								<NavLink to={`/detail/${product.id}`} className={style.cardProductMen}>
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
			</div>
		</div>
	);
};

export default NewsMen;
