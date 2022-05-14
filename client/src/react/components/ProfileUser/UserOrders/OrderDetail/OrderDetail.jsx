import React from "react";
import { useSelector } from "react-redux";
import css from "./OrderDetail.module.css";

import { NavLink, useParams } from "react-router-dom";

export default function OrderDetail() {
  const { payment_id } = useParams()
  console.log('IDDDDDd',payment_id)
  const allOrdersClientes = useSelector((state) => state.allOrdersClientes);
  const order = allOrdersClientes?.find(
    (e) => Number(e.payment_id) === Number(payment_id)
  );
  console.log(order);

  return (
    <div className={css.overlay}>
      <div className={css.container1}>
    <div className={css.container}>
      <h1> ORDEN DE COMPRA</h1>

      <div>
        <h2>Empresa: Clothes 22</h2>
      </div>

      <div>
        <h3>CUIT: </h3>
        <h4>30-28111120006-1</h4>
      </div>

      <div>
        <h3>Orden de compra Numero :</h3>
        <h4>{order.payment_id}</h4>
      </div>

      <div>
        <h3>Estado : </h3>
        <h4>{order.status}</h4>
      </div>

      <div>
        <h3>Email: </h3>
        <h4>{order.email}</h4>
      </div>

      <div>
        <p>Por este medio seran suministrados los siguientes productos</p>
      </div>
      <div className={css.productContainer}>
        <div className={css.productName}>
          <p>
            <b>NOMBRE:</b>
          </p>
          {order.orderDetails.map((e) => {
            return (
              <div key={e.brandSize + e.id + e.name}>
                <p> {e.name}</p>
              </div>
            );
          })}
        </div>

        <div className={css.product}>
          <p>
            <b>COLOR:</b>{" "}
          </p>
          {order.orderDetails.map((e) => {
            return (
              <div key={e.brandSize + e.id + e.color}>
                <p>{e.color}</p>
              </div>
            );
          })}
        </div>

        <div className={css.product}>
          <p>
            <b>CANTIDAD:</b>
          </p>
          {order.orderDetails.map((e) => {
            return (
              <div key={e.brandSize + e.id + e.quantity}>
                <p>{e.quantity}</p>
              </div>
            );
          })}
        </div>

        <div className={css.product}>
          <p>
            <b>PRECIO:</b>
          </p>
          {order.orderDetails.map((e) => {
            return (
              <div key={e.brandSize + e.id + e.currentPrice}>
                <p>${e.currentPrice}</p>
              </div>
            );
          })}
        </div>
      </div>

      <h1>total: {order.total}</h1>
    
    </div>
    <NavLink to={'/user/orders'} style={{ textDecoration: "none" }}><span className={css.x}>X</span></NavLink> 
    </div>
    </div>
  );
}
