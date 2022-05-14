import React from "react";
import css from "./OrderActual.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postOrder, emptyCart } from "../../../../../redux/actions-types";

function OrderActual() {
  const cartItems = useSelector((state) => state.cartItems);
  const { email } = useSelector((state) => state.userData);
  // const subTotal = useSelector((state) => state.subTotal);
  // console.log(subTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(cartItems
    )
    let suma = 0;
    let subtotal = cartItems?.forEach((e) => (suma += e.currentPrice));
    let envio = 50

  const params = location.search
    .slice(1)
    .split("&")
    .map((el) => el.split("="));

  const {
    // collection_id,
    // collection_status,
    payment_id,
    status,
    // external_reference,
    // payment_type,
    // merchant_order_id,
    // preference_id,
    // site_id,
    // processing_mode,
    // merchant_account_id,
  } = Object.fromEntries(params);

  let order = {
    payment_id: payment_id,
    orderDetails: cartItems,
    total: (suma + envio),
    status: status,
    email: email,
  };
  dispatch(postOrder(order));
  const handleClose = (e)=>{
    e.preventDefault()
    dispatch(emptyCart())
    navigate('/user/orders')

  }

  return (
    
    <div onClick={(e)=>handleClose(e)} className={css.overlay}>
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
        <h4>{payment_id}</h4>
        </div>

        <div>
          <h3>Estado : </h3>
        <h4>{status}</h4>
        </div>

        <div>
           <h3>Email: </h3>
        <h4>{email}</h4>
        </div>

           

<div>
            <p>Por este medio seran suministrados los siguientes productos</p>
          </div>
          <div className={css.productContainer}> 



          <div className={css.productName}>
            <p><b>NOMBRE:</b></p>
          {cartItems.map(e=> 
        {  return(
          <div key={e.brandSize + e.id + e.name}>
            <p> {e.name}</p>
          </div>
            )})}
          </div>

          <div className={css.product}>
            <p><b>COLOR:</b> </p>
          {cartItems.map(e=> 
        {  return(
          <div key={e.brandSize + e.id +e.color}>
          
            <p>{e.color}</p>
            
          </div>
            )})}
          </div>

          <div className={css.product}>
            <p><b>CANTIDAD:</b></p> 
          {cartItems.map(e=> 
        {  return(
          <div key={e.brandSize + e.id + e.quantity}>
           
            <p>{e.quantity}</p>
            
          </div>
            )})}
          </div>

          <div className={css.product}>
          <p><b>PRECIO:</b></p> 
          {cartItems.map(e=> 
        {  return(
          <div key={e.brandSize + e.id +e.currentPrice}>
           
            <p>{e.currentPrice}</p>
          </div>
            )})}
          </div>
          </div>
       


        <h1>Total: ${suma + envio}</h1>
        
        
    </div>
   <span onClick={(e)=>handleClose(e)} className={css.x}>X</span>
    </div>
    </div>
  );
}

export default OrderActual;
