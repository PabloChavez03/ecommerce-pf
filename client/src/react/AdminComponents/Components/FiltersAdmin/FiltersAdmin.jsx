import React from "react";
// import FilterBrands from "./FilterBrands/FilterBrands";
import FilterCategory from "./FilterCategory/FilterCategory";


export default function FiltersAdmin({setSelect}) {
    
    return (
        <div>
            <FilterCategory
            setSelect={setSelect}/>
            {/* <FilterBrands/> */}
        </div>
    )
}
