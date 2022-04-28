import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
    const products = useSelector((state)=>state.cartItems);



    return(
        <div>
            {
                products.length === 0 ? <h4>El carrito se encuentra vacío</h4> : products.map((p)=>(
                    <div>
                        <p>{p.name}</p>
                        <p>{p.price}</p>
                    </div>
                ))
            }

            {products.length === 0 ? <h5>Agregar productos al carrito</h5> : <button>Finalizar compra</button>}
        </div>
    )
}