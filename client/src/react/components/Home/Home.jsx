import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import css from "./Home.module.css";
import Filter from "../Filters/Filter";
import { NavLink, useSearchParams } from "react-router-dom";
import Paginated from "../Paginated/Paginated";
import {
	cleanFilters,
	getFiltersGenderProduct,
	setCurrentPage,
	setDetails,
} from "../../../redux/actions-types";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
	const dispatch = useDispatch();
	const [params] = useSearchParams();
	const gender = params.get("gender");
	let allProducts = useSelector((state) => state.products);
	const productFilter = useSelector((state) => state.productFilter);
	const currentPage = useSelector((state) => state.currentPage);
	const [selectFilter, setSelectFilter] = useState("");
	const [productsPerPage] = useState(9);
	const lastProduct = currentPage * productsPerPage;
	const firstProduct = lastProduct - productsPerPage;
	const productsCurent =
	selectFilter === ""
			? allProducts?.slice(firstProduct, lastProduct)
			: productFilter?.slice(firstProduct, lastProduct);
	const [render, setRender] = useState();
		useEffect(() => {
		dispatch(getFiltersGenderProduct(gender));
		dispatch(setCurrentPage(1));
		dispatch(setDetails());
		setSelectFilter("")
	}, [dispatch, gender, setSelectFilter]);

	const handleClickReset = (e) => {
		e.preventDefault();
		setSelectFilter("");
		dispatch(cleanFilters("home"));
	}
	return (
		<div className={css.principalDivHome}>
			<NavBar />
			<SearchBar
			setSelectFilter={setSelectFilter}
			/>
			<button onClick={(e)=>handleClickReset(e)}>Restablecer filtros</button>
			<Filter
				setRender={setRender}
				setCurrentPage={setCurrentPage}
				render={render}
				selectFilter={selectFilter}
				setSelectFilter={setSelectFilter}
				productsCurent={productsCurent}
			/>
			<div>
				<Paginated
					productsToPaginated={selectFilter !== "" ? productsCurent : allProducts}
					lastProduct={lastProduct}
					firstProduct={firstProduct}
					productsPerPage={productsPerPage}
					selectFilter={selectFilter}
					setSelectFilter={setSelectFilter}
				/>
			</div>
			<div className={css.cardContainer}>
				{productsCurent?.length ? (
					productsCurent?.map((product, index) => {
						return (
							<div key={index}>
								<NavLink
									to={`/detail/${product.id}`}
									style={{ textDecoration: "none" }}
								>
									<Cards
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
					})
				) : (
					<p>No hay productos disponibles.</p>
				)}
			</div>
		</div>
	);
}
