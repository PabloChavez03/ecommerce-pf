import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import ProductCardModal from "../CardModal/ProductCardModal";

export default function ShoppingBag() {
    const cartItems = useSelector((state) => state.cartItems);
    let suma = 0;
    let subtotal = cartItems?.forEach((e)=>suma+=e.currentPrice);
    
    const handleClickSend = (e) => {
        e.preventDefault();
        alert("Funcionalidad en desarrollo!");
    };
    
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
                        price={e.currentPrice}
                        image={e.image}
                        quantity={e.quantity}
                        key={e.id}
                    />
                )) : <p>No hay productos en el carrito</p>
            }
            <div>
                <label>Calcular costo de envío</label>
                <br></br>
                <label>Ingresar Código Postal</label>
                <input type="text" placeholder="Ej: 2000"></input>
                <input type="submit" name="send" value="Calcular costo de envío" onClick={(e)=>handleClickSend(e)}/>
            </div>
            <h3>Subtotal:</h3>
            <p>${suma}</p>
            <h3>Costo de envío:</h3>
            <p>$0</p>
            <h2>Total:</h2>
            <p>${suma}</p>

            <button onClick={(e)=>handleClickSend(e)}>Finalizar compra</button>
            <br></br>
            <NavLink to={"/"}>
                <button>Seguir comprando</button>
            </NavLink>
        </div>
    );
};