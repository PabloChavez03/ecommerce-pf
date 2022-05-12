import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {getAllOrders} from "../../../../redux/actions-types/index"
import style from "./AllOrders.module.css"

export default function AllClients() {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllOrders());
	}, []);

	const allOrdersClientes = useSelector((state) => state.allOrders);

    console.log(allOrdersClientes)


    return (
        <div className={style.cardContainer}>
           {allOrdersClientes.map((client) => {
					return (
                        <NavLink key={ client.payment_id } to={`/admin/orders/${client.payment_id}`}>
						<div className={style.cardContainer} >
                            <p><span >Nombre y Apellido del Cliente: </span>{" "}{client.User.name} {client.User.lastname}</p>

							<p>	<span >Nº de Orden:</span> {client.payment_id}</p>

                            <p>	<span >Estado de Pago:</span> {client.status}</p>

                            <p>	<span >Monto Total:</span> $ {client.total}</p>

						</div>
                        </NavLink>
					);
				})}
        </div>
    )
}


