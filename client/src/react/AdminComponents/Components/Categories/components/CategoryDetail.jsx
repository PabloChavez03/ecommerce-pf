import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
	getCategories,
	updateCategory,
} from "../../../../../redux/actions-types";
import s from "./CategoryDetail.module.css";

function CategoryDetail({ id, closeModal }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { token } = useSelector((state) => state.userData);

	const allCategories = useSelector((state) => state.categories);
	const initialCategory = allCategories.find((el) => el.id === Number(id));

	const [category, setCategory] = useState({
		title: "",
		genre: "",
	});

	useEffect(() => {
		setCategory(initialCategory);
	}, []);

	let isThereChanges =
		initialCategory.title !== category.title ||
		initialCategory.genre !== category.genre
			? false
			: true;

	const handleChangeInput = (e) => {
		e.preventDefault();
		setCategory({
			...category,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		dispatch(updateCategory(token, id, category));
		alert("Categoría actualizada");
		dispatch(getCategories());
		navigate("/admin/categories");
		closeModal();
	};

	return (
		<div className={s.container}>
			<h3 className={s.mainTitle}>Modificar categoría</h3>
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
				onClick={handleUpdate}
				className={isThereChanges ? s.disabled : s.button}
				disabled={isThereChanges}
			>
				Actualizar
			</button>
		</div>
	);
}

export default CategoryDetail;
