import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
// import products from "../../../Info/productos.json";
import css from './Home.module.css'
import Paginated from "../Paginated/Paginated";
import { setCurrentPage, getAllProducts } from "../../../redux/actions-types";

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state)=>state.products);
  console.log(allProducts)
  const currentPage = useSelector((state) => state.currentPage);
  const [productsPerPage] = useState(9); //me guarda la cantidad de recetas por pagina.
  const lastProduct = currentPage * productsPerPage; //indice de la ultima receta.
  const firstProduct = lastProduct - productsPerPage; //indice de la primer receta.
  const productsCurent = allProducts.slice(firstProduct, lastProduct);
  console.log(allProducts)
 

  useEffect(()=>{
    dispatch(getAllProducts());
    dispatch(setCurrentPage(1));
  },[dispatch]);

  return (
    <div className={css.principalDivHome}>

      <div className={css.cardContainer}>
            <div>
              <Paginated 
                allProducts={allProducts}
                lastProduct={lastProduct}
                firstProduct={firstProduct}
                productsPerPage={productsPerPage}
              />
            </div>
      {/* Necesitamos el hardcode*/}
      {productsCurent.length ? (
        productsCurent.map((product, index) => {
          return (
            <div key={index}>
              <Cards
                name={product.name}
                id={product.id}
                image={product.image}
                isOffertPrice={product.isOffertPrice}
                previousPrice={product.previousPrice}
                currentPrice={product.currentPrice}
                brandName={product.brandName}
              />
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
};
