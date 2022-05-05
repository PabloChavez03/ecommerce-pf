import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
	getAllCategoriesForForm,
	getDetails,
	postProduct,
} from "../../../../redux/actions-types";

// Components
import AddImages from "../../../components/CreationProduct/components/AddImages";
import AddInfo from "../../../components/CreationProduct/components/AddInfo";
import AddVariants from "../../../components/CreationProduct/components/AddVariants";

// Utils
import s from "../../../components/CreationProduct/ProductCreate.module.css";
import { handleDeleteImg, handleSizeDelete } from "../../../components/CreationProduct/handlers";

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
	if (!input.color || input.color === "") {
		errors.color = <i>"Debe ingresar un color de prenda!"</i>;
		// errors.button = true;
	}
	if (!input.gender || input.gender === "") {
		errors.gender = <i>"Debe ingresar un genero!"</i>;
		// errors.button = true;
	}
	if (!input.brandName || input.brandName === "") {
		errors.brandName = <i>"Debe ingresar una marca!"</i>;
		// errors.button = true;
	}
	if (!input.category.length) {
		errors.category = <i>"Debe ingresar una marca!"</i>;
		// errors.button = true;
	}
	return errors;
}

export default function ProductCreate() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [canAddImage, setCanAddImage] = useState(false);
	const { productId } = useParams();
  
	useEffect(()=>{
	  dispatch(getDetails(productId));
	}, [dispatch, productId]);

	useEffect(() => {
		dispatch(getAllCategoriesForForm());
	}, [dispatch]);

	const productToUpdate = useSelector((state)=>state.details);

	//Categorias para devolver keys
	//let categories = useSelector((state) => state.categoriesForForm);
	// console.log(categories)

	const initialState = {
		name: productToUpdate.name,
		description: productToUpdate.description,
		images: productToUpdate.images,
		previousPrice: productToUpdate.previousPrice,
		isOffertPrice: productToUpdate.isOffertPrice,
		currentPrice: productToUpdate.currentPrice,
		color: productToUpdate.color,
		gender: productToUpdate.gender,
		brandName: productToUpdate.brandName,
		// category: [],
		info: productToUpdate.info,
		variants: productToUpdate.variants,
	};

	const [input, setInput] = useState(initialState);
	const [errors, setError] = useState(initialState);
	// let demoCategories = [];
	// demoCategories = categories.filter((el) => input.category.includes(el.id));
	// console.log(demoCategories)

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setError(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	}

	// function handleSelectCategoryOnChange(e) {
	// 	const value = e.target.value;
	// 	e.preventDefault();
	// 	setInput((prev) => ({
	// 		...prev,
	// 		category: [...input.category, Number(value)],
	// 	}));
		// console.log(value)

		//set Error a revisar

	// 	setError(
	// 		validate({
	// 			...input,
	// 			category: [...input.category, Number(value)],
	// 		})
	// 	);
	// }

	// function handleDeleteSelectCategory(e) {
	// 	const value = e.target.value;
	// 	e.preventDefault();
	// 	setInput((prev) => ({
	// 		...prev,
	// 		category: prev.category.filter((el) => el !== Number(value)),
	// 	}));

	// 	setError(
	// 		validate({
	// 			...input,
	// 			category: input.category.filter((el) => el !== Number(value)),
	// 		})
	// 	);
	// }

	function handleSubmit(e) {
		e.preventDefault();
		if (Object.values(errors).length !== 0) {
			alert("Faltan campos que rellenar");
		} else {
			dispatch(postProduct(input));
			navigate("/");
			alert("Producto creado con exito!");
			navigate("/");
		}
	}

	function handleCheck(e) {
		setInput({
			...input,
			[e.target.name]: !input.isOffertPrice,
		});
	}

	//para futuros keyPress
	// const handleKeyPress = (e) => {
	// 	if (e.key === "Enter") {
	// 		setInput({
	// 			...input,
	// 			category: [...input.category, e.target.value],
	// 		})
	// 		console.log(e)
	// 		console.log(input.category)
	// 	}
	// }

	return (
		<div className={s.container}>
      {
        productToUpdate?.name? <form className={s.form} onSubmit={(e) => handleSubmit(e)}>

				<div className={s.sectionOne}>

					<div className={s.name}>
						<label>Nombre: </label>
						<input
							className={s.input}
							type='text'
							placeholder='Ingrese el nombre!!'
							name='name'
							value={input.name}
							onChange={(e) => handleChange(e)}
						/>
						{errors.name && <p>{errors.name}</p>}
					</div>

					<div className={s.description}>
						<label>Descripción: </label>
						<textarea
							className={s.input}
							type='text'
							placeholder='Ingrese descripcion!!'
							name='description'
							value={input.description}
							onChange={(e) => handleChange(e)}
						></textarea>
						{errors.description && <p>{errors.description}</p>}
					</div>

				</div>


				<div className={s.sectionTwo}>
					<AddImages
						canAddImage={canAddImage}
						setCanAddImage={setCanAddImage}
						input={input}
						setInput={setInput}
						errors={errors}
						setError={setError}
						validate={validate}
					/>

					<div className={s.imageContainerGlobal}>
						{input.images.length
							? input.images.map((el, idx) => {
									return (
										<div key={`addedImg${idx}`} className={s.imageContainer}>
											<button
												className={s.button}
												onClick={(e) => handleDeleteImg(e, el, input, setInput)}
											>
												Eliminar
											</button>
											<img
												className={s.imagen}
												src={`https://${el}`}
												alt={`Added img number ${idx + 1}`}
											/>
										</div>
									);
							  })
							: ""}
					</div>
				</div>

				<div className={s.sectionThree}>
					<div>
						<label>El producto se encuentra en oferta? </label>
						<input
							className={s.offertProduct}
							type='checkbox'
							name='isOffertPrice'
							value={input.isOffertPrice}
							onChange={(e) => handleCheck(e)}
						/>
					</div>

					{input.isOffertPrice && (
						<div>
							<label>Precio anterior: </label>
							<input
								className={s.input}
								type='number'
								placeholder='Ingrese precio!!'
								name='previousPrice'
								value={input.previousPrice}
								onChange={(e) => handleChange(e)}
							/>
							{errors.previousPrice && <p>{errors.previousPrice}</p>}
						</div>
					)}

					<div>
						<label>Precio actual: </label>
						<input
							className={s.input}
							type='number'
							placeholder='Ingrese precio!!'
							name='currentPrice'
							value={input.currentPrice}
							onChange={(e) => handleChange(e)}
						/>
						{errors.currentPrice && <p>{errors.currentPrice}</p>}
					</div>

				</div>

				<div className={s.sectionFour}>
					<div>
						<label>Marca: </label>
						<input
							className={s.input}
							type='text'
							placeholder='Ingrese marca!!'
							name='brandName'
							value={input.brandName}
							onChange={(e) => handleChange(e)}
						/>
						{errors.brandName && <p>{errors.brandName}</p>}
					</div>

					<div>
						<label>Color: </label>
						<input
							className={s.input}
							type='text'
							placeholder='Ingrese color!!'
							name='color'
							value={input.color}
							onChange={(e) => handleChange(e)}
						/>
						{errors.color && <p>{errors.color}</p>}
					</div>
				


					<div>
						<label>Género: </label>
						<select
							className={s.input}
							type='text'
							placeholder='Ingrese fenero!!'
							name='gender'
							value={input.gender}
							onChange={(e) => handleChange(e)}
						>
							<option>Seleccionar</option>
							<option value={"men"}>Hombre</option>
							<option value={"women"}>Mujer</option>
						</select>
					</div>
				</div>
				{/* <div className={s.sectionFive} >
					<label>Categories: </label>
					<select className={s.input} onChange={handleSelectCategoryOnChange}>
						<optgroup value='categories' label='Man'>
							{categories
								?.filter((el) => el.genre === "men")
								.map((el) => (
									<option value={el.id} key={el.id} name={el.title}>
										{el.title}
									</option>
								))}
						</optgroup>
						<optgroup value='categories' label='Woman'>
							{categories
								?.filter((el) => el.genre === "women")
								.map((el) => (
									<option value={el.id} key={el.id} name={el.title}>
										{el.title}
									</option>
								))}
						</optgroup>
					</select>
					<div className={s.categoriesContainerGeneral}>

					{demoCategories?.map((el) => (
						<div key={el.id} className={s.categoriesContainer}>
							<span key={el.id} value={el.id} className={s.spanCategory}>
								{el.title}
							</span>
							<button
								className={s.buttonCategory}
								value={el.id}
								onClick={(e) => handleDeleteSelectCategory(e)}
							>
								x
							</button>
						</div>
					))}
				</div>
				</div> */}

				
				<div className={s.sectionSix} >
					<div>
						<AddInfo
							input={input}
							setInput={setInput}
							errors={errors}
							setError={setError}
							validate={validate}
						/>

						<fieldset className={s.showInfo}>
							<legend>Información adicional actual: </legend>
							{(input.info.aboutMe ||
								input.info.sizeAndFit ||
								input.info.careInfo) && (
								<div>
									<p>
										<span className={s.titulo}>About me:</span>{" "}
										{input.info.aboutMe}
									</p>
									<p>
										<span className={s.titulo}>Size and Fit:</span>{" "}
										{input.info.sizeAndFit}
									</p>
									<p>
										<span className={s.titulo}>Care info:</span>{" "}
										{input.info.careInfo}
									</p>
								</div>
							)}
						</fieldset>
					</div>

					<div>
						<AddVariants input={input} setInput={setInput} />
						{input.variants.length ? (
							<fieldset className={s.showInfo}>
								<legend>Variantes: </legend>
								{input.variants.map((el, idx) => {
									return (
										<div key={`${el.brandSize}${idx}`} className={s.eachVariant}>
											<p>{`Talle: ${el.brandSize} Stock: ${el.stock}`}</p>
											<button
												className={s.buttonCategory}
												onClick={(e) => handleSizeDelete(e, el, input, setInput)}
											>
												x
											</button>
										</div>
									);
								})}
							</fieldset>
						) : (
							""
						)}
					</div>					
					<button
						type='submit'
						className={Object.values(errors).length === 0 ? s.btn : s.btnDisable}
					>
						Modificar Producto
					</button>

				</div>
			</form> : <p>No se encontraron productos</p>
      }
			
		</div>
	);
}
