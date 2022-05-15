import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeFavorited } from "../../../redux/actions-types";
import Swal from 'sweetalert2'
import WishlistIcon from "../svg/WishlistIcon";


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
  color,
}) {
  //   const handleClickAddCart = (event) => {
  //     event.preventDefault(); //provisorio hasta que este el carrito
  //     alert("Funcionalidad en desarrollo");
  // }

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);

    const favorited = user.Products?.some((e) => {
      return e.id === id;
    });

    // console.log("User", JSON.stringify(user, null, 2));
    // console.log(favorited);

    const handleWishlist = (e) => {
      e.preventDefault();

      if (favorited) {
        dispatch(
          changeFavorited(
            user.username,
            { productId: id, action: "remove", token: user.token },
            user.token
          )
        );
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto quitado de Favoritos!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        dispatch(
          changeFavorited(
            user.username,
            { productId: id, action: "add", token: user.token },
            user.token
          )
        );
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto agregado a Favoritos!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    };

    return (
      <div className={css.container}>
        <div hidden={!user.username}className={css.addWishlist} onClick={handleWishlist}>
          <WishlistIcon user={user} productId={id} />
        </div>
        <img src={`https://${image}`} alt="Product Img" />
        <div className={css.price}>
          <h3>{isOffertPrice ? previousPrice : `$ ${currentPrice} `}</h3>
          {isOffertPrice ? (
            <h4>{`Precio de oferta $ ${currentPrice}`}</h4>
          ) : null}
        </div>
        <h5 className={css.title}>{name}</h5>
        {/* <h5 className={css.title}>Color: {color}</h5> */}
        {/* <select>
        <option>Talle</option>
      {
        variants?.length?variants.map((e)=>(
          <option key={e.brandSize} name={e.brandSize} value={e.brandSize}>{e.brandSize}</option>
        )):""
      }
      </select>
      <button onClick={(e)=>handleClickAddCart(e)}>Agregar al carrito</button> */}
      </div>
    );
}
