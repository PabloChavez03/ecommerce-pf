import React from "react";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import Footer from "../Footer/Footer";

export default function Home() {
    const allProducts = useSelector((state) => state.products)
    return (
        <div>
            <h1>Home!</h1>
            <Footer/>
            {
                allProducts.length ? allProducts.map((product) => {
                    return (
                        <div>
                            <Cards 
                                name={product.name}
                                id={product.id}
                                image={product.image}
                                category={product.category}
                                price={product.price}
                                ofertPrice={product.ofertPrice}
                            />
                        </div>
                    )
                }) : <p>No hay productos disponibles.</p>
            }
        </div>
    );
};