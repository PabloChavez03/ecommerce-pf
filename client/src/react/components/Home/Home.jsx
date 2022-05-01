import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import css from "./Home.module.css";
import Filter from "../Filters/Filter";
import { NavLink, useSearchParams } from "react-router-dom";
import Paginated from "../Paginated/Paginated";
import {
  getFiltersGenderProduct, setCurrentPage,
  setDetails
} from "../../../redux/actions-types";


export default function Home() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const gender = params.get('gender');

  const allProducts = useSelector((state) => state.products);
  const productFilter = useSelector((state) => state.productFilter);
  console.log(productFilter)
  const currentPage = useSelector((state) => state.currentPage);
  const select = useSelector((state) => state.select);
  const [productsPerPage] = useState(9);
  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;
  const productsCurent = select === "" ? allProducts.slice(firstProduct, lastProduct) : productFilter.slice(firstProduct, lastProduct);
  const [render, setRender] = useState();
  
  useEffect(() => {
    dispatch(getFiltersGenderProduct(gender))
    dispatch(setCurrentPage(1));
    dispatch(setDetails());
  }, [dispatch, gender]);

  return (
    <div className={css.principalDivHome}>
      <Filter
        setRender={setRender}
        setCurrentPage={setCurrentPage}
        render={render}
      />
      <div>
        <Paginated
          allProducts={allProducts}
          lastProduct={lastProduct}
          firstProduct={firstProduct}
          productsPerPage={productsPerPage}
        />
      </div>
      <div className={css.cardContainer}>
        {/* Necesitamos el hardcode*/}
        {productsCurent.length ? (
          productsCurent.map((product, index) => {
            return (
              <div key={index}>
                <NavLink to={`/detail/${product.id}`} style={{ textDecoration: "none" }}>
                  <Cards
                    name={product.name}
                    image={product.image}
                    isOffertPrice={product.isOffertPrice}
                    previousPrice={product.previousPrice}
                    currentPrice={product.currentPrice}
                  />
                </NavLink>

              </div>
            );
          })
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
