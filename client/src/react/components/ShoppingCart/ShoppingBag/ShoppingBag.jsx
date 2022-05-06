import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../NavBar/NavBar";
import ProductCardModal from "../CardModal/ProductCardModal";

export default function ShoppingBag() {
    const cartItems = useSelector((state) => state.cartItems);

    console.log(cartItems);
    return(
        <div>
            <NavBar/>
            <h1>Mi Carrito</h1>
            {
                cartItems.length?cartItems.map((e) => (
                    <ProductCardModal
                        id={e.id}
                        name={e.name}
                        color={e.color}
                        price={e.price}
                        image={e.image}
                        quantity={e.quantity}
                        key={e.id}
                    />
                )) : <p>No hay productos en el carrito</p>
            }
        </div>
    );
};