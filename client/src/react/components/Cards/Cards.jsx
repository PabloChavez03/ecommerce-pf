import React from "react";
import { NavLink } from "react-router-dom";

export default function Cards({name, price, ofertPrice, category, image, id}) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt="Product Image"/>
            <h5>{price}</h5>
            {
                ofertPrice ? <h5>{ofertPrice}</h5> : null
            }
            <NavLink to={`/detail/${id}`} style={{ textDecoration: 'none' }}><button>Mostrar Detalles</button></NavLink>
        </div>
    );
};