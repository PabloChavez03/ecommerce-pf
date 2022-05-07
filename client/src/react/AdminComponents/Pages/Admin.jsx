import React from "react";
import HeaderAdmin from "../Components/HeaderAdmin";
import NavAdmin from "../Components/NavAdmin";
import style from "./styles/Admin.module.css";
import { Routes, Route } from "react-router-dom";
import HomeAdmin from "../Components/HomeAdmin/HomeAdmin.jsx";
import ProductCreate from "../../components/CreationProduct/ProductCreate.jsx";
import AllProducts from "../Components/CardsAdmin/AllProducts";
import DeleteProduct from "../Components/DeleteProduct/DeleteProduct";
import UpdateProduct from "../Components/UpdateProduct/UpdateProduct";
import AdminCreate from "../Components/AdminCreate/AdminCreate";
import AllClients from "../Components/AllClients/AllClients";
import AllOrders from "../Components/AllOrders/AllOrders";
import ClientDetail from "../Components/AllClients/ClientDetail/ClientDetail";
import OrderDetail from "../Components/OrderDetail/OrderDetail";
import ChatBot from "../Components/ChatBot/ChatBot";

const Admin = () => {
	return (
		<div>
			<HeaderAdmin />
			<div className={style.mainContainer}>
				<div className={style.sectionNavContainer}>
					<NavAdmin />
				</div>
				<div className={style.sectionInfoContainer}>
					<Routes>
						<Route path={"/"} element={<HomeAdmin />} />
						<Route path={"/createproduct"} element={<ProductCreate />} />
						<Route path={"/allproducts"} element={<AllProducts />} />
						<Route path={"/delete/:productId"} element={<DeleteProduct />} />
						<Route path={"/modification/:productId"} element={<UpdateProduct />} />
						<Route path={"/createadmin"} element={<AdminCreate/>} />
						<Route path={"/clients"} element={<AllClients/>} />
						<Route path={"/clients/:idClient"} element={<ClientDetail/>} />
						<Route path={"/orders"} element={<AllOrders/>} />
						<Route path={"/orders/:idOrder"} element={<OrderDetail/>} />
						<Route path={"/chatbot"} element={<ChatBot/>} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default Admin;
