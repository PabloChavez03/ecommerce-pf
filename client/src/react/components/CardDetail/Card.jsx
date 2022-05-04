import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./CardDetail.module.css";
import { addProductToCart } from "../../../redux/actions-types";

export default function Card({
  id,
  name,
  description,
  gender,
  brand,
  images,
  previousPrice,
  isOffertProduct,
  currentPrice,
  variants,
  info,
}) {
  const dispatch = useDispatch();
  const [imageCurrent, setImageCurrent] = useState("");
  const sizes = variants.map((e) => e.brandSize);
  let colours = variants.map((e) => e.color);
  let set = new Set(colours);
  colours = [...set];

  const [productToCart, setProductToCart] = useState({
    name,
    image: images[0],
    currentPrice,
    color: colours[0],
    brandSize: sizes[0],
    quantity: 1,
    id,
  });

  useEffect(() => {
    setImageCurrent(`https://${images[0]}`);
  }, [images]);

  const handleImgChange = (event) => {
    event.preventDefault();
    setImageCurrent(event.target.src);
  };

  const handleAddCart = (event) => {
    event.preventDefault();
    dispatch(addProductToCart(productToCart));
  };

  const handleChangeSelect = (event) => {
    event.preventDefault();
    if (event.target.name === "color") {
      setProductToCart({
        ...productToCart,
        color: event.target.value,
      });
    } else if (event.target.name === "size") {
      setProductToCart({
        ...productToCart,
        brandSize: event.target.value,
      });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.cardDetailContainer}>
        <img
          className={style.cardPrimaryImg}
          src={imageCurrent}
          alt="Img Principal"
        />

        <div className={style.cardDetailImgContainer}>
          {images.length
            ? images.map((image) => (
                <div key={image}>
                  <img
                    className={style.cardCarouselImg}
                    src={`https://${image}`}
                    alt="Img Product"
                    onClick={(e) => handleImgChange(e)}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <div className={style.mainInfo}>
        <h3 className={style.name}>{name}</h3>
        {isOffertProduct ? (
          <div>
            <h5>Precio anterior: {previousPrice}</h5>
            <h5>Precio de oferta: {currentPrice}</h5>
          </div>
        ) : (
          <h1 className={style.price}>${currentPrice}</h1>
        )}
        <div>
          <p
            className={style.description}
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>

        <div className={style.generoMarca}>
          <h4>Género: {gender}</h4>
          <h4>Marca: {brand}</h4>
        </div>
        <div className={style.selectcontainer}>
          <select
            className={style.selects}
            name="color"
            onChange={(e) => handleChangeSelect(e)}
          >
            <option>Color</option>
            {colours.length
              ? colours.map((e) => (
                  <option key={e} value={e} name={e}>
                    {e}
                  </option>
                ))
              : null}
          </select>
          <select
            className={style.selects}
            name="size"
            onChange={(e) => handleChangeSelect(e)}
          >
            <option>Talle</option>
            {sizes.length
              ? sizes.map((e) => (
                  <option key={e} value={e} name={e}>
                    {e}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className={style.info}>
          <p>
            <b>Aditional info:</b>{" "}
          </p>
          <p
            className={style.description}
            dangerouslySetInnerHTML={{ __html: info.aboutMe }}
          ></p>
          <p className={style.description}>{info.careInfo}</p>
          <p
            className={style.description}
            dangerouslySetInnerHTML={{ __html: info.sizeAndFit }}
          ></p>
        </div>
        <div className={style.btns}>
          <button className={style.buttonAdd} onClick={(e) => handleAddCart(e)}>
            AGREGAR AL CARRITO
          </button>

          <NavLink
            to={`/home?gender=${gender}`}
            style={{ textDecoration: "none" }}
          >
            <button className={style.buttonBack}>ATRAS</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
