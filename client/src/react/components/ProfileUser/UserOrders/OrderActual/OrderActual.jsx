import React from "react";
import css from "./OrderActual.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../../../../../redux/actions-types";

function OrderActual() {
  const cartItems = useSelector((state) => state.cartItems);
  const { email } = useSelector((state) => state.userData);
  const subTotal = useSelector((state) => state.subTotal);
  console.log(subTotal);
  const dispatch = useDispatch();
  const location = useLocation();

  const params = location.search
    .slice(1)
    .split("&")
    .map((el) => el.split("="));

  const {
    collection_id,
    collection_status,
    payment_id,
    status,
    external_reference,
    payment_type,
    merchant_order_id,
    preference_id,
    site_id,
    processing_mode,
    merchant_account_id,
  } = Object.fromEntries(params);

  let order = {
    payment_id: payment_id,
    orderDetails: cartItems,
    total: subTotal,
    status: status,
    email: email,
  };
  dispatch(postOrder(order));

  return (
    <div className={css.container}>
        <h1> ORDENESSSSS</h1>
        
        <h1>payment_id: {payment_id}</h1>
        <h1>status: {status}</h1>
        <h1>email: {email}</h1>
        <h1>total: {subTotal}</h1>
        
        
    </div>
  );
}

export default OrderActual;
