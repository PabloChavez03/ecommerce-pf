import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	cleanFilters,
	getAllProducts,
	setDetails,
} from "../../../../redux/actions-types";
import Paginated from "../../../components/Paginated/Paginated";
import FiltersAdmin from "../FiltersAdmin/FiltersAdmin";
import SearchProducts from "../SearchProducts/SearchProducts";
import CardAdmin from "./CardAdmin";
import style from "./CardAdmin.module.css";
import ShowStockProduct from "./ShowStockProduct/ShowStockProduct";

export default function AllProducts() {
	const dispatch = useDispatch();
	const allProducts = useSelector((state) => state.productsAdmin);
	const productFilter = useSelector((state) => state.productFilterAdmin);
	const currentPage = useSelector((state) => state.currentPage);
	const [select, setSelect] = useState("");
	const [productsPerPage] = useState(40);
	const lastProduct = currentPage * productsPerPage;
	const firstProduct = lastProduct - productsPerPage;
	const productsCurent =
		select === ""
			? allProducts.slice(firstProduct, lastProduct)
			: productFilter.slice(firstProduct, lastProduct);

	useEffect(() => {
		dispatch(getAllProducts());
		dispatch(setDetails());
	}, [dispatch]);

	useEffect(() => {}, [select, productsCurent]);

	const handleClickReset = (e) => {
		e.preventDefault();
		setSelect("");
		dispatch(cleanFilters("admin"));
	};

	/** ----- Modal ----- */
	const [modalStock, setModalStock] = useState(true);

	/** ----- Fin del modal ----- */
	return (
		<div className={style.container}>
			{/* <Filter
				setRender={setRender}
				setCurrentPage={setCurrentPage}
				render={render}
			/> */}
			<div className={style.search}>
				<div>
					<button
						onClick={(e) => handleClickReset(e)}
						className={style.btnResetFilters}
					>
						Restablecer filtros
					</button>
				</div>
				<SearchProducts setSelect={setSelect} />
			</div>

			<Paginated
				productsToPaginated={select !== "" ? productsCurent : allProducts}
				lastProduct={lastProduct}
				firstProduct={firstProduct}
				productsPerPage={productsPerPage}
			/>
			<div className={style.filter}>
				<FiltersAdmin setSelect={setSelect} />
			</div>
			<div className={style.cardsContainer}>
				{productsCurent?.length ? (
					productsCurent.map(
						(e, index) => (
							console.log(e),
							(
								<CardAdmin
									key={index}
									id={e.id}
									name={e.name}
									currentPrice={e.currentPrice}
									isInStock={e.isInStock}
									modalStock={modalStock}
									setModalStock={setModalStock}
								/>
							)
						)
					)
				) : (
					<p>No se encontraron productos</p>
				)}
			</div>
			{modalStock && <ShowStockProduct />}
		</div>
	);
}
