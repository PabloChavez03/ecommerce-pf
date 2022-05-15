import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../../redux/actions-types";
import { useModal } from "./components/useModal";

import CategoryCard from "./components/CategoryCard";
import CreateCategory from "./components/CreateCategory";
import Modal from "./components/Modal";

import s from "./Categories.module.css";

function Categories() {
	const dispatch = useDispatch();
	const [isOpenCreate, openModalCreate, closeModalCreate] = useModal(false);
	const categories = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(getCategories());
	}, []);

	return (
		<div className={s.container}>
			<h1 className={s.title}>CATEGORIAS</h1>

			<button className={s.createButton} onClick={openModalCreate}>
				Crear categoría
			</button>
			<Modal isOpen={isOpenCreate} closeModal={closeModalCreate}>
				<CreateCategory closeModal={closeModalCreate} />
			</Modal>

			<div className={s.cards}>
				{categories?.map((category) => {
					return (
						<div>
							<CategoryCard category={category} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Categories;
