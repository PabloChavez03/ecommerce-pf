import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Cart() {
    const products = useSelector((state)=>state.cartItems);

    /*
    Funciones pendientes de implementar en carrito:
    1) Posibilidad de sumar y disminuir la cantidad de productos desde el carrito.
    2) Boton para eliminar el item.
    3) Componente de cards de cada producto (nombre, precio, talla, color).
    4) Boton para cerrar el carrito. ---> por ahora solo lleva a home.
    5) Subtotal, costo de envio y total.
    */

    const handleClickFinish = (event) => {
        event.preventDefault();
        alert("Función en desarrollo...");
    };

    return(
        <div>
            <Link to={"/home"}>
                <button>X</button>
            </Link>
            {
                products.length === 0 ? <h4>El carrito se encuentra vacío</h4> : products.map((p)=>(
                    <div>
                        <p>{p.name}</p>
                        <p>{p.price}</p>
                    </div>
                ))
            }

            {products.length === 0 ? <h5>Agregar productos al carrito</h5> : <button onClick={(e)=>handleClickFinish(e)}>Finalizar compra</button>}
        </div>
    )
}