import React from "react";
import { useDispatch, useState } from "react-redux";
import { getProductByName } from "../../../redux/actions-types";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const handleChangeInput = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    const handleClickSearch = (event) => {
        event.preventDefault();
        dispatch(getProductByName(event.target.value));
        setSearch("");
    };

    return (
        <div>
            <form>
                <input value={search} type={"search"} autoComplete="off" placeholder="Ingrese producto a buscar..." onChange={(e)=>handleChangeInput(e)}/>
                <button onClick={(e) => handleClickSearch(e)}>Buscar</button>
            </form>
        </div>
    );
};