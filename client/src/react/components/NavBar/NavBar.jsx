import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

// import AccountMenu from "./AccountMenu/AccountMenu";

import SearchBar from "../SearchBar/SearchBar";
import CartIcon from "../svg/CartIcon";
import AccountIcon from "../svg/AccountIcon";

import Modal from "../ShoppingCart/Modal/Modal";

import "./NavBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { getFiltersGenderProduct } from "../../../redux/actions-types";
import LoginMenu from "./LoginMenu/LoginMenu";

export default function NavBar() {
	const dispatch = useDispatch();
	let location = useLocation();
	const userCurrent = useSelector((state) => state.userData);
	const { rol } = userCurrent;
	// const [logued, setLogued] = useState(userCurrent.username ? true : false);
	const [logued, setLogued] = useState(false);
	const [rolUser, setRolUser] = useState(rol);
	const [statusModal, setStatusModal] = useState(false);

	/** Ocultando scrollbar del body cuando el modal se activa */
	if (statusModal === true) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "visible";
	}
	/** ------ */
	useEffect(() => {
		if (userCurrent.username) {
			setLogued(true);
		}
	}, [setLogued, userCurrent]);

	const ruteRol = rolUser === "admin" ? "/admin" : "/user/profile";
	let ruteIconAccount = logued === false ? "/login" : ruteRol;

	const handleModalStatus = (e) => {
		e.preventDefault();
		setStatusModal(true);
		setLoginMenu(false);
	};

	const [toogleMenu, setToogleMenu] = useState(false);

	const handleBurguerClick = (e) => {
		e.preventDefault();
		setToogleMenu(!toogleMenu);
	};

	const handleClickForHiddingBurguer = (e) => {
		setToogleMenu(false);
		dispatch(getFiltersGenderProduct(e.target.value));
	};

	/** Menu del login */
	const [loginMenu, setLoginMenu] = useState(false);
	const handleLoginClick = (e) => {
		e.preventDefault();
		setLoginMenu(!loginMenu);
	};

	return (
		<nav className='nav'>
			<div className='nav__up'>
				<div className='nav__up__left'>
					<span className='nav__up__left__burguer' onClick={handleBurguerClick}>
						<span className='nav__up__left__burguer_bar'></span>
						<span className='nav__up__left__burguer_bar'></span>
						<span className='nav__up__left__burguer_bar'></span>
						<span className='nav__up__left__burguer_bar'></span>
					</span>
					<NavLink to={"/"} style={{ textDecoration: "none" }}>
						<h1 className='nav__up__left__logo'>CLOTHES 22</h1>
					</NavLink>
				</div>

				<div className='nav__up__features'>
					{/* <WishListIcon /> */}

					<div
						className='loginMenuContainer'
						onClick={(e) => handleLoginClick(e)}
					>
						<AccountIcon className='accountIcon' />
					</div>
					{loginMenu && <LoginMenu setLoginMenu={setLoginMenu} />}

					<div className='icon_cart' onClick={(e) => handleModalStatus(e)}>
						{/* <NavLink exact to={"/cart"} onClick={handleClickForHiddingBurguer}> */}
						<CartIcon />
						{/**Insertando el componente modal */}
						{/* </NavLink> */}
					</div>

					{/* <NavLink to={ruteIconAccount} className='accountContainer'>
						<AccountIcon className='accountIcon' />
						<h3 className='accountName'>
							{userCurrent.username ? userCurrent.username : "Login"}
						</h3>
					</NavLink> */}

					<Modal status={statusModal} setStatus={setStatusModal} />
					{/* <AccountMenu/> */}
				</div>
			</div>

			<div className='nav__down'>
				<div className={`nav__down__links ${toogleMenu ? "menuActived" : ""}`}>
					<ul>
						<NavLink to={"/"} onClick={handleClickForHiddingBurguer}>
							<li>Home</li>
						</NavLink>

						<Link
							to={"/home?gender=Men"}
							className={
								`${location.pathname}${location.search}` === "/home?gender=Men"
									? "active"
									: ""
							}
							onClick={(e) => handleClickForHiddingBurguer(e)}
							value='men'
						>
							<li>Men</li>
						</Link>

						<Link
							to={"/home?gender=Women"}
							className={
								`${location.pathname}${location.search}` ===
								"/home?gender=Women"
									? "active"
									: ""
							}
							onClick={(e) => handleClickForHiddingBurguer(e)}
							value='women'
						>
							<li>Women</li>
						</Link>

						<NavLink to={"/about"} onClick={handleClickForHiddingBurguer}>
							<li>About</li>
						</NavLink>
					</ul>
				</div>
			</div>

			<div className='nav__searchBar'>
				<SearchBar />
			</div>
		</nav>
	);
}
