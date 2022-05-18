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
import Loader from "../Loader/Loader";

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
			: typeof productFilter !== "string" &&
			  productFilter?.slice(firstProduct, lastProduct);

	const [render, setRender] = useState();
	useEffect(() => {
		dispatch(getFiltersGenderProduct(gender));
		dispatch(setCurrentPage(1));
		dispatch(setDetails());
		setSelectFilter("");
	}, [dispatch, gender, setSelectFilter]);

  const handleClickReset = (e) => {
    e.preventDefault();
    setSelectFilter("");
    dispatch(cleanFilters("home"));
  };

  return (
    <div className={css.principalDivHome}>
      <NavBar />
      <div className={css.search}>

        <SearchBar setSelectFilter={setSelectFilter} />
      </div>

			{typeof productFilter !== "string" && (
				<Filter
					setRender={setRender}
					setCurrentPage={setCurrentPage}
					render={render}
					selectFilter={selectFilter}
					setSelectFilter={setSelectFilter}
					productsCurent={productsCurent}
				/>
			)}

			{typeof productFilter !== "string" && (
				<div>
					<Paginated
						productsToPaginated={
							selectFilter !== "" ? productsCurent : allProducts
						}
						lastProduct={lastProduct}
						firstProduct={firstProduct}
						productsPerPage={productsPerPage}
						selectFilter={selectFilter}
						setSelectFilter={setSelectFilter}
					/>
				</div>
			)}

			{typeof productFilter === "string" ? (
				<div className={css.cardContainer}>
					<h1 className={css.notFound} onClick={(e) => handleClickReset(e)}>
						No se encontraron productos.
						<br />
						Haz click aquí para reestablecer
					</h1>
				</div>
			) : (
				<div className={css.cardContainer}>
					{productsCurent?.length < 2 ? (
						<Loader />
					) : (
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
					)}
				</div>
			)}
		</div>
	);
}
