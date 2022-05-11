import React from "react";
import { NavLink } from "react-router-dom";

export default function UserOrders() {
    const idOrder = 1 // hardcodeado para testear ruta.
    return(
        <div>
            <h1>Ordenes del usuario</h1>
            <NavLink to={`/user/orders/${idOrder}`}>
                Detalle de un pedido
            </NavLink>
        </div>
    )
}