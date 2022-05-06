import React from "react";
import { NavLink } from "react-router-dom";

// import Construction from "../Construction/Construction";
import css from "./Cards.module.css";

export default function Cards({
  id,
  name,
  image,
  isOffertPrice,
  previousPrice,
  currentPrice,
  variants,
  color
}) {
  const handleClickAddCart = (event) => {
    event.preventDefault(); //provisorio hasta que este el carrito
    alert("Funcionalidad en desarrollo");
}
  console.log(color)
  return (
    <div className={css.container}>
        <img src={`https://${image}`} alt="Product Img" />
      <div className={css.price}>
        <h3>{isOffertPrice ? previousPrice : `$ ${currentPrice} `}</h3>
        {isOffertPrice ? <h4>{`Precio de oferta $ ${currentPrice}`}</h4> : null}
      </div>
      <h5 className={css.title}>{name}</h5>
      <h3>Color: {color}</h3>
      <select>
        <option>Talle</option>
      {
        variants?.length?variants.map((e)=>(
          <option key={e.brandSize} name={e.brandSize} value={e.brandSize}>{e.brandSize}</option>
        )):""
      }
      </select>
      <button onClick={(e)=>handleClickAddCart(e)}>Agregar al carrito</button>
    </div>
  );
}
