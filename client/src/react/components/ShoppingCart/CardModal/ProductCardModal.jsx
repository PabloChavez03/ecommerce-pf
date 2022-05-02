import React from "react";
import style from "./ProductCardModal.module.css";
import { useDispatch } from "react-redux";
import {
  removeProductFromCart,
  changeCartQuantity,
} from "../../../../redux/actions-types";

const ProductCardModal = ({
  id,
  name,
  color,
  price,
  size,
  image,
  quantity,
}) => {
  /** FALTA AGREGAR LOS OTROS DATOS, SOLO ESTOY RENDERIZANDO EL NAME */
  const dispatch = useDispatch();
  
  const handleRemove = () => {
    dispatch(removeProductFromCart(id));
  };
  const handleQtyChange = (e) => {
    e.preventDefault();
    dispatch(changeCartQuantity(e.target.value, id));
  };

  return (
    <div className={style.cardModalContainer}>
      <img
        className={style.cardModalImg}
        src={"https://" + image}
        alt="imagen_product"
      />
      <div className={style.cardModalInfoContainer}>
        <p className={style.cardModalTitle}>{name}</p>
        <p>Color: {color}</p>
        <p>Talla: {size}</p>
        <div className={style.cardModalInfoPrice}>
          <p className={style.cardModalInfo}>
            Precio: <span>$ {price}</span>
          </p>
          <p className={style.cardModalInfo}>
            Cantidad:
            <span>
              <button value={"-"} onClick={(e) => handleQtyChange(e)}>
                {" "}
                -{" "}
              </button>
              <span>{quantity}</span>
              <button value={"+"} onClick={(e) => handleQtyChange(e)}>
                {" "}
                +{" "}
              </button>
            </span>
          </p>
          <p className={style.cardModalInfo}>
            Total: <span>$ {price * quantity}</span>
          </p>
        </div>
      </div>

      <span onClick={() => handleRemove()}>X</span>
    </div>
  );
};

export default ProductCardModal;
