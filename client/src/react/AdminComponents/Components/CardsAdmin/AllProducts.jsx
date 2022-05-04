import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../../redux/actions-types";
import CardAdmin from "./CardAdmin";
import style from './CardAdmin.module.css';


export default function AllProducts() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={style.container} >
      {allProducts.length
        ? allProducts.map((e) => (
              <CardAdmin
                key={e.id}
                id={e.id}
                name={e.name}
                currentPrice={e.currentPrice}
              />
          ))
        : null}
    </div>
  );
}
