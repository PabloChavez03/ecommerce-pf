import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
		if(event.target.value === "") {
			alert("Debe ingresar un producto a buscar!")
		} else {
			dispatch(getProductByName(search));
			setSearch("");
		};
	};

	return (
		<div>
			<form>
				<input
					value={search}
					type={"search"}
					placeholder="Ingrese producto a buscar..."
					onChange={(e) => handleChangeInput(e)}
				/>
				<button onClick={(e) => handleClickSearch(e)}>Buscar</button>
			</form>
		</div>
	);
}
