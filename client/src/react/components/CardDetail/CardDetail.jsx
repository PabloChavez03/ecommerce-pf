import React, { useEffect, useState } from "react";
// import Cards from "../Cards/Cards";
import products from "../../../Info/productos.json";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../../redux/actions-types";
import style from "./CardDetail.module.css";
// var Carousel = require("react-responsive-carousel").Carousel;

export default function CardDetail() {
	const dispatch = useDispatch();
	//const [quantity, setQuantity] = useState(1);

	const { idProduct } = useParams();
	const productFilter = products.filter(
		(e) => parseInt(e.id_product) === parseInt(idProduct)
	);

	const [imagesRender, setImagesRender] = useState([]);
	const [imageCurrent, setImageCurrent] = useState("");

	const [sizesRender, setSizesRender] = useState([]);

	const {
		// URL

		name,
		price,
		description,
		is_offer,
		price_offer,
		variants,
		id_product,
		default_image,
	} = productFilter[0];
	const [colorSelect, setColorSelect] = useState(variants[0].ColorName);

	const [productFilterCart, setProductFilterCart] = useState({
		name,

		price: is_offer ? price_offer : price,
		color: colorSelect,
		size: "",
		id_product,
		default_image,
	});

	useEffect(() => {
		setImagesRender(variants[0].ProductImages);
		setSizesRender(Object.keys(variants[0].Stocks));
		setImageCurrent(variants[0].ProductImages[0]);
	}, [variants]);

	// const handleQuantity = (e) => {
	// 	e.preventDefault();
	// 	if (e.target.name === "less") setQuantity(quantity - 1);
	// 	if (e.target.name === "more") setQuantity(quantity + 1);
	// };

	const colors = variants.map((e) => e.ColorName);

	// const handleChangeSelect = (event) => {
	// 	event.preventDefault();
	// 	// setColorSelect(event.target.value);
	// 	let variantFilter = variants.find((e)=> e.ColorName === event.target.value);
	// 	console.log(variantFilter)
	// 	let keys = Object.keys(variantFilter.Stocks);
	// 	setImagesRender(variantFilter.ProductImages);
	// 	setSizesRender(keys);
	// 	setProductFilterCart({
	// 		...productFilterCart,
	// 		[event.target.name]: event.target.value
	// 	});
	// };

	const handleChangeSelect = (event) => {
		event.preventDefault();

		if (event.target.name === "color") {
			setColorSelect(event.target.value);
			let variantFilter = variants.find(
				(e) => e.ColorName === event.target.value
			);
			setImagesRender(variantFilter.ProductImages);
			setProductFilterCart({
				...productFilterCart,
				color: event.target.value,
			});
		} else if (event.target.name === "size") {
			let variantFilter = variants.find((e) => e.ColorName === colorSelect);

			let keys = Object.keys(variantFilter.Stocks);
			setSizesRender(keys);
			setProductFilterCart({
				...productFilterCart,

				size: event.target.value,
			});
		}
	};

	const handleAddCart = (event) => {
		event.preventDefault();
		dispatch(addProductToCart(productFilterCart));
	};

	/**Creando evento para la imagen */
	const handleImgChange = (event) => {
		event.preventDefault();
		console.log(event.target.src);
		setImageCurrent(event.target.src);
	};

	return (
		<div className={style.cardDetailContainer}>
			<div className={style.cardDetailImgContainer}>
				{/* <Carousel>
					{imagesRender.length
						? imagesRender.map((image) => (
								<div key={image}>
									<img
										className={style.cardDetailImg}
										src={image}
										alt='Img Product'
									/>
								</div>
						  ))
						: null}
				</Carousel> */}
				<div>
					{imagesRender.length
						? imagesRender.map((image) => (
								<div key={image}>
									<img
										className={style.cardCarouselImg}
										src={image}
										alt='Img Product'
										onClick={(event) => handleImgChange(event)}
									/>
								</div>
						  ))
						: null}
				</div>
				<div>
					<img
						className={style.cardPrimaryImg}
						src={imageCurrent}
						alt='Img Principal'
					/>
				</div>
			</div>

			<div>
				<h1>{name}</h1>
				<h3>Precio $ {price}</h3>
				<p>{description}</p>
				{is_offer ? <h3>Precio de oferta $ {price_offer}</h3> : null}
				<h4>Variantes:</h4>
				<select name='color' onChange={(e) => handleChangeSelect(e)}>
					<option>Color</option>
					{colors.length ? (
						colors.map((color) => (
							<option key={color} name='color' value={color}>
								{color}
							</option>
						))
					) : (
						<option>UNIQUE</option>
					)}
				</select>
				<select name='size' onChange={(e) => handleChangeSelect(e)}>
					<option>Talle</option>
					{sizesRender.length
						? sizesRender.map((size) => (
								<option name='size' value={size} key={size}>
									{size}
								</option>
						  ))
						: null}
				</select>

				<button onClick={(e) => handleAddCart(e)}>Agregar al carrito</button>
			</div>
			{/* <button>UnCorazon:D</button>

				<h1>{name}</h1>
				{price_offer ? (
					<>
						<p>
							<s>{price}</s>
						</p>
						<strong>{price_offer}</strong>
					</>
				) : (
					<p>{price}</p>
				)}
			</div>

			<div>
				<h2>Disponible en</h2>
				{colors.map((el) => el.name)}
			</div>
			<div>
				<h2>Selecciona tu talla</h2>
				{sizes.map((el) => el.name)}
			</div>

			<div>
				<h2>Cantidad</h2>
				<div>
					<button onClick={handleQuantity} name={"less"}>
						-
					</button>
					<span>{quantity}</span>
					<button onClick={handleQuantity} name={"more"}>
						+
					</button>
				</div>
				{/* <h5>Hay {stock} productos en stock</h5> */}
			{/* </div>

			<div>
				<h2>Reviews</h2>
			</div>

			<div>
				<h2>Productos relacionados</h2>
				<div>
					{relatedProducts.forEach((el) => {
						return (
							<Cards
								name={el.name}
								price={el.price}
								ofertPrice={el.price_offer}
								category={el.category}
								image={el.image}
								id={el.id}
							/>
						);
					})}
				</div>
			</div> */}
		</div>
	);
}
