import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllClientsOrders } from "../../../../../redux/actions-types/index";
// import s from "./allClients.module.css";

export default function AllClientsOrders() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getAllClientsOrders(token));
  }, [dispatch]);

  const allOrdersClientes = useSelector((state) => state.allOrdersClientes);

  console.log(allOrdersClientes);

  return (
    <div>
      <h1>Todos mis clientes</h1>
      <div>
        {allOrdersClientes.map((client) => {
          return (
            <div key={client.UserUserName}>
              {/* <NavLink to={`/admin/clients/${client.UserUserName}`}> */}
              <h3>{client.UserUserName}</h3>
              {/* </NavLink> */}
              <p>
                <span>Nombre de usuario:</span> {client.client.UserUserName}
              </p>
              <p>
                <span>Nº de Orden:</span> {client.payment_id}
              </p>
            </div>
          );
        })}
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
