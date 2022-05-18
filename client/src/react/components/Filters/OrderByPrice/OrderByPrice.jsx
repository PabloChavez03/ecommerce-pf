import React from "react";
import { useDispatch } from "react-redux";
import { orderByPrice } from "../../../../redux/actions-types";

function OrderByPrice({ setRender, setCurrentPage, setSelectFilter, productsCurent }) {
  const dispatch = useDispatch();
  function handleOrderByPrice(e) {
    if(e.target.value !== "Order"){
      e.preventDefault();
      dispatch(orderByPrice(e.target.value,productsCurent ));
      setRender(`set order by ${e.target.value}`);
      setCurrentPage(1);
      setSelectFilter(e.target.value);
    } else {
      setSelectFilter("");
    }
  }
  return (
    <div>
      <select onChange={(e) => handleOrderByPrice(e)}>
        <option value="Order">Orden por Precio</option>
        <option value="high">Mayor Precio</option>
        <option value="low">Menor Precio</option>
      </select>
    </div>
  );
}

export default OrderByPrice;
