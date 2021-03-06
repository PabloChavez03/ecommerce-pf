import React from "react";
import style from "./styles/NavAdmin.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../../redux/actions-types";
import Swal from 'sweetalert2'


const NavAdmin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleClickLoggedOut = (e) => {
		e.preventDefault();
		dispatch(loggedOut());
		Swal.fire(
			'Sesión cerrada exitosamente!',
			'',
			'success'
		  )
		
		navigate("/");
	};

	return (
		<>
			<nav className={style.navContainer}>
				<ul className={style.listContainer}>
					<NavLink className={style.navLinkAdmin} to={"/admin/principal"}>
						Principal
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/categories"}>
						Modificar Categorías
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/createproduct"}>
						Crear Producto
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/allproducts"}>
						Listado de Productos
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/createadmin"}>
						Crear Administrador
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/clients"}>
						Mis Clientes
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/profile"}>
						Mi Perfil
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/chatbot"}>
						Chat Bot
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/orders"}>
						Ordenes
					</NavLink>
					<NavLink className={style.navLinkAdmin} to={"/admin/Publicidad"}>
						Publicidad Mail
					</NavLink>
					
					<button
						onClick={(e) => handleClickLoggedOut(e)}
						className={style.navAdminButton}
					>
						Cerrar Sesión
					</button>
				</ul>
			</nav>
		</>
	);
};

export default NavAdmin;
