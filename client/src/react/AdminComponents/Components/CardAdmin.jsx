import React from "react";
import { NavLink } from "react-router-dom";

export default function CardAdmin({ name, gender, currentPrice, id }) {
  return (
    <div>
      <div>
        <h4>{name}</h4>
        <h4>{currentPrice}</h4>
      </div>
      <NavLink to={`/admin/modification/${id}`} style={{ textDecoration: "none" }}>
        <button>modificar producto</button>
      </NavLink>
      <NavLink to={`/admin/delete/${id}`} style={{ textDecoration: "none" }}>
        <button>Eliminar ítem</button>
      </NavLink>
    </div>
  );
}
