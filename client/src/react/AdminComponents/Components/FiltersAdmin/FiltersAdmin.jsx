import React from "react";
// import FilterBrands from "./FilterBrands/FilterBrands";
import FilterCategory from "./FilterCategory/FilterCategory";
import FilterStock from "./FilterStock/FilterStock";

export default function FiltersAdmin({ setSelect }) {
  return (
    <div>
      <FilterCategory setSelect={setSelect} />
      <FilterStock setSelect={setSelect} />
    </div>
  );
}
