import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import CartIcon from "../svg/CartIcon";
import AccountIcon from "../svg/AccountIcon";

import "./NavBar.scss";

export default function NavBar() {
	const [toogleMenu, setToogleMenu] = useState(false);

	const handleBurguerClick = (e) => {
		e.preventDefault();
		setToogleMenu(!toogleMenu);
	};

	const handleClickForHiddingBurguer = (e) => {
		setToogleMenu(false);
	};

	return (
		<nav className="nav">
			<div className="nav__up">
				<div className="nav__up__left">
					<span className="nav__up__left__burguer" onClick={handleBurguerClick}>
						<span className="nav__up__left__burguer_bar"></span>
						<span className="nav__up__left__burguer_bar"></span>
						<span className="nav__up__left__burguer_bar"></span>
					</span>
					<h1 className="nav__up__left__logo">CLOTHES 22</h1>
				</div>

				<div className="nav__up__searchBar">
					<SearchBar />
				</div>

				<div className="nav__up__features">
					{/* <WishListIcon /> */}
					<NavLink exact to={"/cart"} onClick={handleClickForHiddingBurguer}>
						<CartIcon />
					</NavLink>
					<NavLink exact to={"/account"} onClick={handleClickForHiddingBurguer}>
						<AccountIcon />
					</NavLink>
				</div>
			</div>

			<div className="nav__down">
				<div className={`nav__down__links ${toogleMenu ? "menuActived" : ""}`}>
					<ul>
						<NavLink exact to={"/home"} onClick={handleClickForHiddingBurguer}>
							<li>Home</li>
						</NavLink>
						<NavLink exact to={"/about"} onClick={handleClickForHiddingBurguer}>
							<li>About</li>
						</NavLink>
					</ul>
				</div>
			</div>

			<div className="nav__searchBar">
				<SearchBar />
			</div>
		</nav>
	);
}
