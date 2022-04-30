import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";
// import products from "../../../Info/productos.json";
import css from "./Home.module.css";
import Paginated from "../Paginated/Paginated";
import { setCurrentPage, getAllProducts } from "../../../redux/actions-types";

export default function Home() {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const allProducts = useSelector((state)=>state.products);
=======
  const allProducts = useSelector((state) => state.products);
>>>>>>> 17e473bad21985a981665d7473924d75af31daed
  const currentPage = useSelector((state) => state.currentPage);
  const [productsPerPage] = useState(9); //me guarda la cantidad de recetas por pagina.
  const lastProduct = currentPage * productsPerPage; //indice de la ultima receta.
  const firstProduct = lastProduct - productsPerPage; //indice de la primer receta.
  const productsCurent = allProducts.slice(firstProduct, lastProduct);
<<<<<<< HEAD
 
=======
>>>>>>> 17e473bad21985a981665d7473924d75af31daed

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  return (
    <div className={css.principalDivHome}>
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
