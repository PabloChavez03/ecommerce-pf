import React from "react";
import { NavLink } from "react-router-dom";

export default function AllClients() {
    let idClient=1 // id hardcodeado para probar ruta.

    return (
        <div>
            <h1>Todos mis clientes</h1>
            <NavLink to={`/admin/clients/${idClient}`}>
                Nombre del cliente
            </NavLink>
        </div>
    )
}