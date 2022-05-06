import React from "react";
import { NavLink } from "react-router-dom";

export default function HomeAdmin() {
	const handleClickConstruction = (e) => {
		e.preventDefault();
		alert("Funcionalidad en desarrollo!");
	};
	
	return(
		<div>
			<NavLink to={"/admin/allproducts"}>
			<button>MIS PRODUCTOS</button>
			</NavLink>
			<NavLink to={"/admin/createproduct"}>
			<button>CARGAR PRODUCTOS</button>
			</NavLink>
			<button onClick={(e)=>handleClickConstruction(e)}>MIS CLIENTES</button>
			<button onClick={(e)=>handleClickConstruction(e)}>MIS VENTAS</button>
		</div>
	);
};
 