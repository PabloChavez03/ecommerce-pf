import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/Footer";
import products from "../../../Info/productos.json";
import css from './Home.module.css'
import Paginated from "../Paginated/Paginated";
import { setCurrentPage } from "../../../redux/actions-types";

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = products;
  const currentPage = useSelector((state) => state.currentPage);
  const [productsPerPage] = useState(9); //me guarda la cantidad de recetas por pagina.
  const lastProduct = currentPage * productsPerPage; //indice de la ultima receta.
  const firstProduct = lastProduct - productsPerPage; //indice de la primer receta.
  const productsCurent = allProducts.slice(firstProduct, lastProduct);
  const [limitNumberPage] = useState(5); //limite de botones con numero de pag que quiero mostrar.
  const [maxLimitNumberPage, setmaxLimitNumberPage] = useState(5); //numero limite maximo de pagina.(la ultima) por ej si renderiza 5, la primera vez sera 5, la segunda vez sera 10 y asi sucesivamente.
  const [minLimitNumberPage, setminLimitNumberPage] = useState(0); //numero minimo de pagina. (la primera)

  console.log(allProducts.length)
  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1))
    if(currentPage + 1 > maxLimitNumberPage) {
        setmaxLimitNumberPage(maxLimitNumberPage + limitNumberPage);
        setminLimitNumberPage(minLimitNumberPage + limitNumberPage);
    };
};

const handlePrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1))
    if(parseInt((currentPage - 1) % limitNumberPage) === 0) {
        setmaxLimitNumberPage(maxLimitNumberPage - limitNumberPage);
        setminLimitNumberPage(minLimitNumberPage - limitNumberPage);
    };
};

  useEffect(()=>{
    dispatch(setCurrentPage(1));
  },[dispatch]);
  
  return (
    <div>

      <div className={css.cardContainer}>
            <div>
              <Paginated 
                allProducts={allProducts}
                lastProduct={lastProduct}
                firstProduct={firstProduct}
                productsPerPage={productsPerPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
              />
            </div>
      {/* Necesitamos el hardcode*/}
      {productsCurent.length ? (
        productsCurent.map((product, index) => {
          return (
            <div key={index}>
              <Cards
                name={product.name}
                price={product.price}
                price_offer={product.price_offer}
                id_product={product.id_product}
                default_image={product.default_image}
                is_offer={product.is_offer}
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
