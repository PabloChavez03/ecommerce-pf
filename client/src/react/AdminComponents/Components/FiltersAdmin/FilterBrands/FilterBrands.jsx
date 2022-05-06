import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getAllProducts, setCurrentPage } from "../../../../../redux/actions-types";

export default function FilterBrands() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    },[dispatch]);

    const allProducts = useSelector((state) => state.products);
    
    const handleChangeSelect = (event) => {
        event.preventDefault();
        if (event.target.value !== "selectBrand") {
            // dispatch(filterBrandAdmin(event.target.value));
            dispatch(setCurrentPage(1));
        };
    };
    return (
        <div>
            <select onChange={(e) => handleChangeSelect(e)}>
                <option value={"selectBrand"}>Seleccionar Marca</option>
                {
                    allProducts?.length?allProducts.map((e) => (
                        <option key={e.id} value={e.brandName} name={e.brandName}>{e.brandName}</option>
                    )):""
                }
            </select>
            
        </div>
    )
}
