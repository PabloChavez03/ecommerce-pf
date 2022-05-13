import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {getAllOrders, filterOrderByStatus} from "../../../../redux/actions-types/index"
import style from "./AllOrders.module.css"
import SearchBarOrders from "../SearchBarOrders/SearchBarOrders";

export default function AllClients() {

	const dispatch = useDispatch();
    const { token } = useSelector((state) => state.userData);

	useEffect(() => {
		dispatch(getAllOrders());
	}, [dispatch]);

	const allOrdersClientes = useSelector((state) => state.allOrders);

 

    function handleFilterByStatusOrder(e){
        e.preventDefault();
        if(e.target.value === "todas"){
            dispatch(getAllOrders())
        } else {

            dispatch(filterOrderByStatus(token, e.target.value))
        }
        
    };


    return (
        <div className={style.cardContainer}>
                <label>Filtras por Estado de Compra
            <select onChange={e => { handleFilterByStatusOrder(e) }}>
                <option value="todas" >Todas</option>
                <option value="approved">Success</option>
                <option value="pending">Pending</option>
                <option value="failure">Failure</option>
            </select>
                </label>

        <div >
            <SearchBarOrders/>
        </div>

           {allOrdersClientes?.map((client) => {
            
					return (
                        <NavLink key={ client.payment_id } to={`/admin/orders/${client.payment_id}`}>
						<div className={style.cardContainer} >
                            <p><span >Nombre y Apellido del Cliente: </span>{" "}{client.UserUserName} </p>

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


