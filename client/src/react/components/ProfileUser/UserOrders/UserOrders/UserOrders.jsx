import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllClientsOrders } from "../../../../../redux/actions-types/index";
import s from "./UserOrders.module.css";

export default function AllClientsOrders() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getAllClientsOrders(username));
  }, [dispatch]);

  const allOrdersClientes = useSelector((state) => state.allOrdersClientes);
  // const { orderDetails } = allOrdersClientes;

  // console.log(orderDetails) de momento no vienen ordenes por eso tirar error


  return (
    <div className={s.container}>
      <h1 className={s.title}>Todas mis ordenes de compra</h1>

      {allOrdersClientes?.map((client, id) => (
        <NavLink
          key={id}
          to={`/user/orders/${client.payment_id}`}
          style={{ textDecoration: "none" }}
           className={s.orders}
        >
            <div className={s.ordenFecha}>
              <span>Nº: <b>{client.payment_id}</b> </span>
              <span>{client.orderDate.slice(0, 10)}</span>
            </div>
            <div className={s.ordenFecha}>
              <span>Total: <b>${client.total}</b></span>
              <div><span>Status: </span><span className= {client.status === 'rejected'? s.rejected :client.status === 'pending'? s.pending : s.approved }>{client.status}</span> </div>
            </div>
            
        </NavLink>
      ))}
    </div>
  );
}

// [
// 	{
// 		"payment_id": "785441",
// 		"orderDetails": [
// 			{},
// 			{}
// 		],
// 		"total": 25,
// 		"orderDate": "2022-05-11T21:01:05.494Z",
// 		"status": "failure",
// 		"createdAt": "2022-05-11T21:01:05.494Z",
// 		"updatedAt": "2022-05-11T21:01:05.522Z",
// 		"UserUserName": "pablochave0313"
// 	},
// 	{
// 		"payment_id": "7854411",
// 		"orderDetails": [
// 			{},
// 			{}
// 		],
// 		"total": 25,
// 		"orderDate": "2022-05-11T21:01:37.784Z",
// 		"status": "failure",
// 		"createdAt": "2022-05-11T21:01:37.785Z",
// 		"updatedAt": "2022-05-11T21:01:
