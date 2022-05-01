import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getCategoryById, setCurrentPage, setSelect } from "../../../../redux/actions-types";

export default function FilterByCategory() {
    const dispatch = useDispatch();
    const allCategories = useSelector((state)=>state.categories);

    useEffect(()=>{
        dispatch(getAllCategories());
    },[dispatch]);

    const handleChangeSelect = (event) => {
        event.preventDefault();
        console.log(event.target.name)
        if(event.target.value !== "selectCategory") {
            dispatch(getCategoryById(event.target.value));
            dispatch(setCurrentPage(1));
            dispatch(setSelect(event.target.value));
            console.log(event.target.value)
        }
        
    };

    return (
        <div>
            <select onClick={(e)=>handleChangeSelect(e)}>
                <option value={"selectCategory"}>Seleccionar Categoría</option>
                {
                    allCategories.length?allCategories.map((e)=>(
                        <option key={e.id} value={e.id} name={e.title}>{e.title}</option>
                    )):null
                }
            </select>
        </div>
    )
}