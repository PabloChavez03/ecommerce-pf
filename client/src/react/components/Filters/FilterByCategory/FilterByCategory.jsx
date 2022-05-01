import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getCategoryById, setCurrentPage } from "../../../../redux/actions-types";

export default function FilterByCategory() {
    const dispatch = useDispatch();
    const allCategories = useSelector((state)=>state.categories);

    useEffect(()=>{
        dispatch(getAllCategories());
    },[dispatch]);

    const handleChangeSelect = (event) => {
        event.preventDefault();
        if(event.target.value !== "selectCategory") {
            dispatch(getCategoryById(event.target.value));
            dispatch(setCurrentPage(1));
        };
    };

    return (
        <div>
            <select onChange={(e)=>handleChangeSelect(e)}>
                <option value={"selectCategory"}>Seleccionar Categoría</option>
                {
                    allCategories.length?allCategories.map((e)=>(
                        <option key={e.id} value={e.id} name={e.title}>{e.title}</option>
                    )):null
                }
            </select>
        </div>
    );
};