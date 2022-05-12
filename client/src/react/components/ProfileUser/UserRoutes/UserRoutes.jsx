import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import DeleteReviews from "../DeleteReviews/DeleteReviews";
import HomeUser from "../HomeUser/HomeUser";
import NavUser from "../NavUser/NavUser";
import ProfileUser from "../ProfileUser";
import ReviewsUser from "../ReviewsUser/ReviewsUser";
import OrderDetail from "../UserOrders/OrderDetail/OrderDetail";
import UserOrders from "../UserOrders/UserOrders/UserOrders";
import OrderActual from "../UserOrders/OrderActual/OrderActual";
import style from "../UserRoutes/User.module.css";
import UpdateReviews from "../UpdateReviews/UpdateReviews";

export default function UserRoutes() {
  return (
    <div>
      <NavBar />
      <div className={style.sectionNavContainer}>{/* <NavUser /> */}</div>
      <div className={style.sectionInfoContainer}>
        <Routes>
          <Route path={"/"} element={<HomeUser />} />
          <Route path={"/profile"} element={<ProfileUser />} />
          <Route path={"/orders"} element={<UserOrders />} />
          <Route path={"/orders/:idOrder"} element={<OrderDetail />} />
          <Route path={"/orders/actual"} element={<OrderActual />} />
          <Route path={"/reviews"} element={<ReviewsUser />} />
          <Route
            path={"/reviews/delete/:reviewId"}
            element={<DeleteReviews />}
          />
          <Route
            path={"/reviews/update/:reviewId"}
            element={<UpdateReviews />}
          />
        </Routes>
      </div>
    </div>
  );
}
