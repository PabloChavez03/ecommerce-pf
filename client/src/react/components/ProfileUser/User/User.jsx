import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import HomeUser from "../HomeUser/HomeUser";
import NavUser from "../NavUser/NavUser";
import ProfileUser from "../ProfileUser";
import ReviewsUser from "../ReviewsUser/ReviewsUser";
import OrderDetail from "../UserOrders/OrderDetail/OrderDetail";
import UserOrders from "../UserOrders/UserOrders/UserOrders";
import style from "./User.module.css";

export default function User() {
  return (
    <div>
      <NavBar />
      <div className={style.sectionNavContainer}>
        <NavUser />
      </div>
      <div className={style.sectionInfoContainer}>
        <Routes>
        <Route path={"/"} element={<HomeUser />} />
          <Route path={"/profile"} element={<ProfileUser />} />
          <Route path={"/orders"} element={<UserOrders />} />
          <Route path={"/orders/:idOrder"} element={<OrderDetail />} />
          <Route path={"/reviews"} element={<ReviewsUser />} />
        </Routes>
      </div>
    </div>
  );
}
