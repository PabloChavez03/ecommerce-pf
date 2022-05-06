import React from "react";
import { NavLink } from "react-router-dom";

export default function AllClients() {
    let idOrder=1 // id hardcodeado para probar ruta.

    return (
        <div>
            <h1>Todas mis ordenes</h1>
            <NavLink to={`/admin/orders/${idOrder}`}>
                Número de orden
            </NavLink>
        </div>
    )
}