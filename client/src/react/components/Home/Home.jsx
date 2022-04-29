import React from "react";
import Cards from "../Cards/Cards";
//import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import products from "../../../Info/productos.json";
import css from './Home.module.css'

export default function Home() {
  const allProducts = products;
  return (
    <div>

      <div className={css.cardContainer}>

      {/* Necesitamos el hardcode*/}
      {allProducts.length ? (
        allProducts.map((product, index) => {
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
