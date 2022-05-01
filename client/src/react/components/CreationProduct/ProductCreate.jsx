import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { postProduct } from "../../../redux/actions-types";

// Components
import AddImages from "./components/AddImages";
import AddInfo from "./components/AddInfo";
import AddVariants from "./components/AddVariants";

// Utils
import s from "./ProductCreate.module.css";
import { handleDeleteImg } from "./handlers";

// const validateImg = (urlImg) => {
//   const regex = /.*\.(gif|jpe?g|bmp|png)$/gim;
//   return regex.test(urlImg);
// };
// const deepHouseMatute = () => {
//     return parseInt(Math.random() + Date.now())
// }

function validate(input) {
	let errors = {};
	// errors.button = false;

	if (!input.name || input.name === "") {
		errors.name = <i>"Debe ingresar un nombre del producto!"</i>;
		// errors.button = true;
	}
	if (!input.description || input.description === "") {
		errors.description = <i>"Debe ingresar una description del producto!"</i>;
		// errors.button = true;
	}

	if (!input.images.length) {
		errors.images = <i>"Debe agregar al menos una imagen producto!"</i>;
		// errors.button = true;
	}

	if (!input.previousPrice || input.previousPrice < 0) {
		errors.previousPrice = <i>"Debe ingresar un importe valido!"</i>;
		// errors.button = true;
	}
	if (!input.currentPrice || input.currentPrice < 0) {
		errors.currentPrice = <i>"Debe ingresar un importe valido!"</i>;
		// errors.button = true;
	}
	if (!input.colour || input.colour === "") {
		errors.colour = <i>"Debe ingresar un color de prenda!"</i>;
		// errors.button = true;
	}
	if (!input.gender || input.gender === "") {
		errors.gender = <i>"Debe ingresar un genero!"</i>;
		// errors.button = true;
	}
	if (!input.brand || input.brand === "") {
		errors.brand = <i>"Debe ingresar una marca!"</i>;
		// errors.button = true;
	}

	if (!input.category || input.category === "") {
		errors.category = <i>"Debe ingresar una marca!"</i>;
		// errors.button = true;
	}
	return errors;
}

export default function ProductCreate() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [canAddImage, setCanAddImage] = useState(false);

	const [errors, setError] = useState({});
	const [input, setInput] = useState({
		name: "",
		description: "",
		images: [],
		previousPrice: 0,
		isOffertPrice: false,
		currentPrice: 0,
		colour: "",
		gender: "",
		brand: "",
		category: "",
		info: {
			aboutMe: "",
			sizeAndFit: "",
			careInfo: "",
		},
		variants: [],
	});

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setError(
			validate({
				...input,
				[e.target.name]: e.target.value,
			}),
		);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(postProduct({ ...input, category: 6455 }));
		setInput({
			name: "",
			description: "",
			images: [],
			previousPrice: 0,
			isOffertPrice: false,
			currentPrice: 0,
			brandName: "",
			colour: "",
			gender: "",
			info: {
				aboutMe: "",
				sizeAndFit: "",
				careInfo: "",
			},
			variants: [],
		});
		navigate("/home");
		alert("Producto creado con exito!");
		console.log(input);
	}

	function handleCheck(e) {
		setInput({
			...input,
			[e.target.name]: !input.isOffertPrice,
		});
	}

	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label>Name: </label>
					<input
						type="text"
						placeholder="Ingrese el nombre!!"
						name="name"
						value={input.name}
						onChange={(e) => handleChange(e)}
					/>
					{errors.name && <p>{errors.name}</p>}
				</div>

				<div>
					<label>Description: </label>
					<input
						type="text"
						placeholder="Ingrese descripcion!!"
						name="description"
						value={input.description}
						onChange={(e) => handleChange(e)}
					/>
					{errors.description && <p>{errors.description}</p>}
				</div>

				<div>
					<AddImages
						canAddImage={canAddImage}
						setCanAddImage={setCanAddImage}
						input={input}
						setInput={setInput}
						errors={errors}
						setError={setError}
						validate={validate}
					/>

					{input.images.length
						? input.images.map((el, idx) => {
								return (
									<div key={`addedImg${idx}`}>
										<button
											onClick={(e) => handleDeleteImg(e, el, input, setInput)}
										>
											Eliminar
										</button>
										<img src={el} alt={`Added img number ${idx + 1}`} />
									</div>
								);
						  })
						: ""}
				</div>

				<div>
					<label>Previous Price: </label>
					<input
						type="number"
						placeholder="Ingrese precio!!"
						name="previousPrice"
						value={input.previousPrice}
						onChange={(e) => handleChange(e)}
					/>
					{errors.previousPrice && <p>{errors.previousPrice}</p>}
				</div>

				<div>
					<label>isOffertPrice: </label>
					<input
						type="checkbox"
						name="isOffertPrice"
						value={input.isOffertPrice}
						onChange={(e) => handleCheck(e)}
					/>
				</div>

				<div>
					<label>Current Price: </label>
					<input
						type="number"
						placeholder="Ingrese precio!!"
						name="currentPrice"
						value={input.currentPrice}
						onChange={(e) => handleChange(e)}
					/>
					{errors.currentPrice && <p>{errors.currentPrice}</p>}
				</div>

				<div>
					<label>Brand Name: </label>
					<input
						type="text"
						placeholder="Ingrese marca!!"
						name="brand"
						value={input.brand}
						onChange={(e) => handleChange(e)}
					/>
					{errors.brand && <p>{errors.brand}</p>}
				</div>

				<div>
					<label>Colour: </label>
					<input
						type="text"
						placeholder="Ingrese color!!"
						name="colour"
						value={input.colour}
						onChange={(e) => handleChange(e)}
					/>
					{errors.colour && <p>{errors.colour}</p>}
				</div>

				<div>
					<label>Gender: </label>
					<select
						type="text"
						placeholder="Ingrese fenero!!"
						name="gender"
						value={input.gender}
						onChange={(e) => handleChange(e)}
					>
						<option>Seleccionar</option>
						<option value={"men"}>Men</option>
						<option value={"women"}>Women</option>
					</select>
				</div>

				<div>
					<AddInfo
						input={input}
						setInput={setInput}
						errors={errors}
						setError={setError}
						validate={validate}
					/>

					<fieldset>
						<legend>Información adicional actual: </legend>
						{(input.info.aboutMe ||
							input.info.sizeAndFit ||
							input.info.careInfo) && (
							<div>
								<p>About me: {input.info.aboutMe}</p>
								<p>Size and Fit: {input.info.sizeAndFit}</p>
								<p>Care info: {input.info.careInfo}</p>
							</div>
						)}
					</fieldset>
				</div>

				<AddVariants />

				<button type="submit">Crear Producto</button>
			</form>
		</div>
	);
}
