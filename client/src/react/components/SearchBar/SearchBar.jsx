import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName } from "../../../redux/actions-types";
import style from "./SearchBar.module.css";

export default function SearchBar({setSelectFilter}) {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const handleChangeInput = (event) => {
		event.preventDefault();
		setSearch(event.target.value.toUpperCase());
	};

	const handleClickSearch = (event) => {
		event.preventDefault();
		if(search === "") {
			alert("Debe ingresar un producto a buscar!");
		} else {
			dispatch(getProductByName(search));
			setSearch("");
			setSelectFilter("search");
		};
	};

	// const productsName = useSelector((state) => )

	return (
		<div>
			<form className={style.searchContainer}>
				<input
					value={search}
					type={"search"}
					placeholder="Ingrese producto a buscar..."
					onChange={(e) => handleChangeInput(e)}
				/>
				<button onClick={(e) => handleClickSearch(e)}>BUSCAR</button>
				{/* <img className={style.imgSearch} src={lupa} alt="Search" onClick={(e)=>handleClickSearch(e)}/> */}
			</form>
		</div>
	);
}
