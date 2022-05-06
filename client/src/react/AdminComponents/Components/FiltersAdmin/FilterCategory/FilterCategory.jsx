import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesForForm, getCategoryById, setCurrentPage } from "../../../../../redux/actions-types";

export default function FilterCategory() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoriesForForm());
    },[dispatch]);

    const allCategories = useSelector((state) => state.categoriesForForm);

    const handleChangeSelect = (event) => {
        event.preventDefault();
        if (event.target.value !== "selectCategory") {
            dispatch(getCategoryById(event.target.value));
            dispatch(setCurrentPage(1));
        };
    };
    return (
        <div>
            <select onChange={(e) => handleChangeSelect(e)}>
                <option value={"selectCategory"}>Seleccionar Categoría</option>
                <optgroup value='categories' label='Men'>
							{allCategories
								?.filter((el) => el.genre === "men")
								.map((el) => (
									<option value={el.id} key={el.id} name={el.title}>
										{el.title}
									</option>
								))}
						</optgroup>
                        <optgroup value='categories' label='Women'>
							{allCategories
								?.filter((el) => el.genre === "women")
								.map((el) => (
									<option value={el.id} key={el.id} name={el.title}>
										{el.title}
									</option>
								))}
						</optgroup>
            </select>
            
        </div>
    )
}
