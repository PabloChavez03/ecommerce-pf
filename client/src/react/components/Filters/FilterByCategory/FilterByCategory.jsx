import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getAllCategories, getCategoryById, setCurrentPage } from "../../../../redux/actions-types";

export default function FilterByCategory({selectFilter, setSelectFilter}) {
    const dispatch = useDispatch();
    const [params] = useSearchParams();
    const gender = params.get('gender')
    const allCategories = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(getAllCategories(gender));
    }, [dispatch, gender]);

    const handleChangeSelect = (event) => {
        event.preventDefault();
        if (event.target.value !== "selectCategory") {
            dispatch(getCategoryById(event.target.value));
            dispatch(setCurrentPage(1));
            console.log(event.target.value)
            setSelectFilter(event.target.value);
            console.log(selectFilter)
            
        } else {
            setSelectFilter("");
        }
    };

    return (
        <div>
            <select onChange={(e) => handleChangeSelect(e)}>
                <option value={"selectCategory"}>Seleccionar Categoría</option>
                {
                    allCategories?.length?allCategories.map((e)=>(
                        <option key={e.id} value={e.id} name={e.title}>{e.title}</option>
                    )):""
                }
            </select>
        </div>
    );
};