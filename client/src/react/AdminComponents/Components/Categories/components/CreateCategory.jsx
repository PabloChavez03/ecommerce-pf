import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	createCategory,
	getCategories,
} from "../../../../../redux/actions-types";

import s from "./CreateCategory.module.css";

function CreateCategory({ closeModal }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { token } = useSelector((state) => state.userData);

	const [category, setCategory] = useState({
		id: "",
		title: "",
		genre: "",
	});

	const [errors, setErrors] = useState({});

	function validate({ id, title }) {
		let errors = {};

		if (!id || id === 0) errors.id = "Debe ingresar un id distinto a 0";
		if (typeof id !== "number" || id > 100000 || id < 0)
			errors.id =
				"El id debe contener solo números y ser mayor que 0 y menor a 100000";
		if (!title) errors.title = "Debe ingresar un titulo";
		if (typeof title !== "string" || title.length > 60)
			errors.title =
				"El titulo solo debe contener letras y su extensión menor a 60 caracteres";

		return errors;
	}
	/** Fin function validate */

	const [disabledButton, setDisabledButton] = useState(true);

	useEffect(() => {
		if (
			category.title === "" ||
			errors.hasOwnProperty("id") ||
			errors.hasOwnProperty("title")
		) {
			setDisabledButton(true);
		} else {
			setDisabledButton(false);
		}
	}, [errors, category, setDisabledButton]);

	const handleChangeInput = (e) => {
		e.preventDefault();

		if (e.target.name === "id") {
			setCategory({
				...category,
				id: Number(e.target.value),
			});
			setErrors(
				validate({
					...category,
					id: Number(e.target.value),
				}),
			);
		} else if (e.target.name === "id" && typeof e.target.value === "string") {
			alert("Por favor no ingrese texto como id");
		} else {
			setCategory({
				...category,
				[e.target.name]: e.target.value,
			});

			setErrors(
				validate({
					...category,
					[e.target.name]: e.target.value,
				}),
			);
		}
	};

	const handleCreate = (e) => {
		e.preventDefault();
		dispatch(createCategory(token, category));
		alert("Categoría creada");
		dispatch(getCategories());
		navigate("/admin/categories");
		closeModal();
		setCategory({
			id: "",
			title: "",
			genre: "",
		});
	};

	return (
		<div className={s.container}>
			<div className={s.section}>
				<label className={s.label} htmlFor="id">
					ID:
				</label>
				<input
					className={s.input}
					type="number"
					name="id"
					id="id"
					value={category.id}
					onChange={handleChangeInput}
				/>
			</div>
			{errors.id && <i>{errors.id}</i>}

			<div className={s.section}>
				<label className={s.label} htmlFor="title">
					Título:
				</label>
				<input
					className={s.input}
					type="text"
					name="title"
					id="title"
					value={category.title}
					onChange={handleChangeInput}
				/>
			</div>
			{errors.title && <i>{errors.title}</i>}

			<div className={s.section}>
				<label className={s.label} htmlFor="genre">
					Género:
				</label>
				<select
					className={s.select}
					value={category.genre}
					name="genre"
					id="genre"
					onChange={handleChangeInput}
				>
					<option value="women">Mujer</option>
					<option value="men">Hombre</option>
				</select>
			</div>
			<button
				disabled={disabledButton}
				className={s.button}
				onClick={handleCreate}
			>
				Crear categoría
			</button>
		</div>
	);
}

export default CreateCategory;
