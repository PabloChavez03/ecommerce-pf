import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, setDetails } from "../../../../redux/actions-types";
import Filter from "../../../components/Filters/Filter";
import Paginated from "../../../components/Paginated/Paginated";
import SearchProducts from "../SearchProducts/SearchProducts";
import CardAdmin from "./CardAdmin";
import style from './CardAdmin.module.css';

export default function AllProducts() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const productFilter = useSelector((state) => state.productFilter);
	const currentPage = useSelector((state) => state.currentPage);
	const select = useSelector((state) => state.select);
	const [productsPerPage] = useState(40);
	const lastProduct = currentPage * productsPerPage;
	const firstProduct = lastProduct - productsPerPage;
	const productsCurent =
		select === ""
			? allProducts.slice(firstProduct, lastProduct)
			: productFilter.slice(firstProduct, lastProduct);
	const [render, setRender] = useState();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(setDetails());
  }, [dispatch]);


  return (
    <div className={style.container} >
      {/* <Filter
				setRender={setRender}
				setCurrentPage={setCurrentPage}
				render={render}
			/> */}
			
				<Paginated
					productsToPaginated={select !== "" ? productsCurent : allProducts}
					lastProduct={lastProduct}
					firstProduct={firstProduct}
					productsPerPage={productsPerPage}
				/>
        <SearchProducts/>
			<div className={style.cardsContainer}>
      {productsCurent.length
        ? productsCurent.map((e , index) => (
              <CardAdmin
                key={index}
                id={e.id}
                name={e.name}
                currentPrice={e.currentPrice}
                isInStock={e.isInStock}
              />
          ))
        : <p>No se encontraron productos</p>}
        </div>
    </div>
  );
}
