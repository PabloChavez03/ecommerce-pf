import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDetails } from "../../../../../redux/actions-types";
import style from "./ShowStockProduct.module.css";

const ShowStockProduct = ({ modalStock, setModalStock }) => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState({});
  const productDetailStock = useSelector((state) => state.details);

  const { name, variants } = detail;

  useEffect(() => {
    setDetail(productDetailStock);
  }, [setDetail, productDetailStock]);

  const handleCloseModal = () => {
    setModalStock(!modalStock);
    dispatch(setDetails({}));
  };

  return (
    <div className={style.modalStockProductContainerOverlay}>
      <div className={style.modalStockProductContainer}>
        <div className={style.modalHeader}>
          <h2 className={style.productName}>{name}</h2>
          <span
            className={style.modalCloseButton}
            onClick={() => handleCloseModal()}
          ></span>
        </div>
        <div className={style.listTitle}>
          <p>Talle</p>
          <p>Stock</p>
        </div>
        <div className={style.listItems}>
          {variants ? (
            variants.map((item) => (
              <div key={item.brandSize} className={style.rowContainer}>
                <p>{item.brandSize}</p>
                <p>{item.stock}</p>
              </div>
            ))
          ) : (
            <p>Cargando el stock ...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowStockProduct;
