import React from "react";
import { useDispatch } from "react-redux";
import { getStockProductRender } from "../../../../../redux/actions-types";

export default function FilterStock({ setSelect }) {
  const dispatch = useDispatch();

  const handleChangeSelectStock = (e) => {
    e.preventDefault();
    if (e.target.value !== "seleccionar") {
      dispatch(getStockProductRender(e.target.value));
      setSelect("stock");
    } else {
      setSelect("");
    }
  };
  return (
    <div>
      <select onChange={(e) => handleChangeSelectStock(e)}>
        <option value="seleccionar">Seleccionar estado de Stock</option>
        <option value="stockTrue">En Stock</option>
        <option value="stockFalse">Sin Stock</option>
      </select>
    </div>
  );
}
