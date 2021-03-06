import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName, getProductByNameAdmin } from "../../../../redux/actions-types";
import style from "../../../components/SearchBar/SearchBar.module.css";
//import lupa from "../../../components/svg/buscar.png";
import Swal from 'sweetalert2'

export default function SearchProducts({setSelect}) {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const handleChangeInput = (event) => {
		event.preventDefault();
		setSearch(event.target.value.toUpperCase());
	};

	const handleClickSearch = (event) => {
		event.preventDefault();
		if(search === "") {
			Swal.fire(
				'Debe ingresar un producto a buscar!',
				'',
				'success'
			  )
		} else {
			dispatch(getProductByNameAdmin(search));
			setSearch("");
			setSelect("search");
		};
	};

	return (
		<div>
			<form className={style.searchContainer}>
				<input
					value={search}
					type={"search"}
					placeholder="Ingrese producto a buscar..."
					onChange={(e) => handleChangeInput(e)}
                    className={style.inputSearch}
				/>
				<button onClick={(e) => handleClickSearch(e)}>BUSCAR</button>
				{/* <img className={style.imgSearch} src={lupa} alt="Search" onClick={(e)=>handleClickSearch(e)}/> */}
			</form>
		</div>
	);
}
