import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import CartIcon from "../svg/CartIcon";
import AccountIcon from "../svg/AccountIcon";
import CreateIcon from "../svg/CreateIcon";
import Modal from "../ShoppingCart/Modal/Modal";

import "./NavBar.scss";

export default function NavBar() {
	let location = useLocation();
	// console.log(
	// 	`${location.pathname}${location.search}` === "/home?gender=Women",
	// );

	/**State para el modal */
	const [statusModal, setStatusModal] = useState(false);

  const handleModalStatus = (e) => {
    e.preventDefault();
    setStatusModal(true);
  };

  /** Fin modal */

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
            <span className="nav__up__left__burguer_bar"></span>
          </span>
          <NavLink to={"/"} style={{ textDecoration: "none" }}>
            <h1 className="nav__up__left__logo">CLOTHES 22</h1>
          </NavLink>
        </div>

        <div className="nav__up__searchBar">
          <SearchBar />
        </div>

				<div className="nav__up__features">
					{/* <WishListIcon /> */}
					<Link to={"/creation"}>
						<CreateIcon />
					</Link>

          <div className="icon_cart" onClick={(e) => handleModalStatus(e)}>
            {/* <NavLink exact to={"/cart"} onClick={handleClickForHiddingBurguer}> */}
            <CartIcon />
            {/**Insertando el componente modal */}
            {/* </NavLink> */}
          </div>
          <Modal status={statusModal} setStatus={setStatusModal} />
          <NavLink to={"/account"} onClick={handleClickForHiddingBurguer}>
            <AccountIcon />
          </NavLink>
        </div>
      </div>

			<div className="nav__down">
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
							onClick={handleClickForHiddingBurguer}
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
							onClick={handleClickForHiddingBurguer}
						>
							<li>Women</li>
						</Link>

						<NavLink to={"/about"} onClick={handleClickForHiddingBurguer}>
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
