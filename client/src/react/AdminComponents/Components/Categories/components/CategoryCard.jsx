import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	deleteCategory,
	getCategories,
} from "../../../../../redux/actions-types";
import { useModal } from "./useModal";

import CategoryDetail from "./CategoryDetail";
import Modal from "./Modal";
import TrashIcon from "../svg/TrashIcon";

import s from "./CategoryCard.module.css";

function CategoryCard({ category: { title, id, genre } }) {
	const { token } = useSelector((state) => state.userData);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isOpenModify, openModalModify, closeModalModify] = useModal(false);

	const stopPropagation = (e) => {
		e.stopPropagation();
	};

	const handleDeleteCategory = (e) => {
		dispatch(deleteCategory(token, id));
		alert("Categoría eliminada");
		dispatch(getCategories());
	};

	return (
		<>
			<div className={s.info} onClick={openModalModify}>
				<div className={s.delete} onClick={stopPropagation}>
					<TrashIcon deleteFunction={handleDeleteCategory} />
				</div>
				<h3 className={s.title}>{title}</h3>
				<p className={s.text}>ID: {id}</p>
				<p className={s.text}>Género: {genre}</p>
			</div>
			<Modal isOpen={isOpenModify} closeModal={closeModalModify}>
				<CategoryDetail id={id} closeModal={closeModalModify} />
			</Modal>
		</>
	);
}

export default CategoryCard;
