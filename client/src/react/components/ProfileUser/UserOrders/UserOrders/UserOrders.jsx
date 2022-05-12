import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllClientsOrders } from "../../../../../redux/actions-types/index";
// import s from "./allClients.module.css";

export default function AllClientsOrders() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getAllClientsOrders(username));
  }, [dispatch]);

  const allOrdersClientes = useSelector((state) => state.allOrdersClientes);
  const { orderDetails } = allOrdersClientes;

  // console.log(orderDetails) de momento no vienen ordenes por eso tirar error

  console.log(allOrdersClientes);

  return (
    <div>
      <h1>Todas mis ordenes de compra</h1>
      <div>
        {allOrdersClientes?.map((client,id) => (
          <div key={id}>
            {/* <h3>{client?.UserUserName}</h3> */}
            <br /> {/* el br es el espaciador */}
            <p>
              <span>Fecha de emisión: </span>
              {client.orderDate}
            </p>
            <p>
              <span>Nº de Orden: </span>
              {client.payment_id}
            </p>
            <p>
              <span>Status: </span>
              {client.status}
            </p>
            <p>
              <span>Total: </span>
              {client.total}
            </p>
          </div>
        ))}
      </div>
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
