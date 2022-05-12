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


    let idOrder=1 // id hardcodeado para probar ruta.

    return (
        <div className={style.cardContainer}>
           {allOrdersClientes.map((client) => {
					return (
                        <NavLink to={`/admin/orders/${client.payment_id}`}>
						<div className={style.cardContainer} >
                            <p><span >Nombre y Apellido del Cliente: </span>{" "}{client.User.name} {client.User.lastname}</p>

                            {/* <p><span >Apellido de Cliente: </span>{" "}{client.User.lastname}</p> */}
{/* 
							<p><span >Nombre de usuario: </span>{" "}{client.UserUserName}</p> */}

							<p>	<span >Nº de Orden:</span> {client.payment_id}</p>

                            <p>	<span >Estado de Pago:</span> {client.status}</p>

                            <p>	<span >Monto Total:</span> $ {client.total}</p>

                            {/* <p>	<span >Detalle de Compra:</span> {client.orderDetails.map(e=> 
                             {  return(
                             <div key={e.brandSize + e.id }>
                                  <p> Nombre del Producto:  {e.name}</p>
                                  <p> Talla: {e.brandSize}</p>
                                  <p> Color: {e.color}</p>
                                  <p> Precio Actual: $ {e.currentPrice}</p>
                                  <p> Id:  {e.id}</p>
                                  <p> Imagen:  {e.image}</p>
                                  <p> Cantidad:  {e.quantity}</p>
                                  <p> Variants:  {e.variants.map(e =>{
                                      return(
                                          <div>
                                              <p> Talla: {e.brandSize}  - Stock: {e.stock} </p>
                                          </div>
                                      )
                                  })}</p>
                                   </div>
                                     )})}</p> */}
							
						</div>
                        </NavLink>
					);
				})}
        </div>
    )
}


