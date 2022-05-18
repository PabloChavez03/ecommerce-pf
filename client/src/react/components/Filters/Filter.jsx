import React from "react";
import FilterByCategory from "./FilterByCategory/FilterByCategory";
import FiltersByMark from "./FiltersByMark/FiltersByMark";
import OrderByPrice from "./OrderByPrice/OrderByPrice";
import css from "./Filter.module.css";
import { cleanFilters } from "../../../redux/actions-types";
import { useDispatch } from "react-redux";

function Filter({
  setRender,
  setCurrentPage,
  selectFilter,
  setSelectFilter,
  productsCurent,
}) {
  const dispatch = useDispatch();
  const handleClickReset = (e) => {
    e.preventDefault();
    setSelectFilter("");
    dispatch(cleanFilters("home"));
  };
  return (
    <div className={css.container}>

        <button onClick={(e) => handleClickReset(e)} className={css.reset}>
          Restablecer filtros
        </button>
      <OrderByPrice
        setRender={setRender}
        setCurrentPage={setCurrentPage}
        selectFilter={selectFilter}
        setSelectFilter={setSelectFilter}
        productsCurent={productsCurent}
      />
      <FilterByCategory
        selectFilter={selectFilter}
        setSelectFilter={setSelectFilter}
        setCurrentPage={setCurrentPage}
      />
      <FiltersByMark
        setCurrentPage={setCurrentPage}
        selectFilter={selectFilter}
        setSelectFilter={setSelectFilter}
      />
    </div>
  );
}

export default Filter;
