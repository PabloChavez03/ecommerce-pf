import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


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
		
		
		Swal.fire({
			title: "¿Seguro desea eliminar Categoria?",
			text: "Una vez aceptado no se puede revertir los cambios!",
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteCategory(token, id));
				Swal.fire("Confirmado!", "Su categoria ha sido eliminada.", "success");
			}
		});
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
