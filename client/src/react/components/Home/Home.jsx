import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import css from "./Home.module.css";
import Filter from "../Filters/Filter";
import { NavLink } from "react-router-dom";
import Paginated from "../Paginated/Paginated";
import { setCurrentPage, getAllProducts, setDetails } from "../../../redux/actions-types";


export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);
  const currentPage = useSelector((state) => state.currentPage);
  const [productsPerPage] = useState(9);
  const lastProduct = currentPage * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;
  const productsCurent = allProducts.slice(firstProduct, lastProduct);
 

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(setCurrentPage(1));
    dispatch(setDetails());
  }, [dispatch]);

  return (
    <div className={css.principalDivHome}>
      <Filter/>
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
