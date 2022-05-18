import React from "react";
// import FilterBrands from "./FilterBrands/FilterBrands";
import FilterCategory from "./FilterCategory/FilterCategory";
import FilterStock from "./FilterStock/FilterStock";
import css from './FilterAdmin.module.css'


export default function FiltersAdmin({ setSelect }) {
  return (
    <div className={css.container}>
      <FilterCategory setSelect={setSelect} />
      <FilterStock setSelect={setSelect} />
    </div>
  );
}
