import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import ProductCardModal from "../CardModal/ProductCardModal";
import css from "./ShoppingBag.module.css";
import Swal from 'sweetalert2'
import axios from "axios";
import { removeStock } from '../../../../redux/actions-types'

export default function ShoppingBag() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartItems);
  const userData = useSelector((state) => state.userData);

  let suma = 0;
  let subtotal = cartItems?.forEach((e) => (suma += e.currentPrice * e.quantity));
  let envio = 50;

  const [email, setEmail] = useState("");

  const handleClickSend = (e) => {
    
    e.preventDefault();
    Swal.fire(
      'Funcionalidad en desarrollo!',
      '',
      'success'
    )
  };



  const handlePayment = async (e) => {
    e.preventDefault();

    if (suma === 0) {
      Swal.fire(
        'Debe agregar productos al carrito para continuar!',
        '',
        'success'
      )
      navigate("/");
      return;
    }
    if (userData.rol === "admin") {
      Swal.fire(
        'Un administrador no puede realizar compras!',
        '',
        'error'
      )
      return;
    }
    let validateStock =()=>{
      cartItems.forEach(e=> e.brandSize )
    }

    const emailAux = userData.email ? userData.email : email;
    dispatch(removeStock(cartItems))
    const { data } = await axios.get(
      "/mercadopago/payment",
      {
        params: { cartItems, emailAux, envio },
      }
    );

    //generamos nuestra orden de compra
    //cartItems === orderDetails, envio + suma === total, userData.dni_client === dni_client

    window.open(data.init_point, "_self");
  };

  return (
    <div className={css.container}>
      <div className={css.nav}>
        <NavBar />
      </div>
      <h1 className={css.name}>Mi Carrito</h1>
      <div className={css.modalCartContainer}>
        {cartItems.length ? (
          cartItems.map((e) => (
            <ProductCardModal
              id={e.id}
              name={e.name}
              color={e.color}
              price={e.currentPrice}
              image={e.image}
              size={e.brandSize}
              quantity={e.quantity}
              key={e.id + e.brandSize}
            />
          ))
        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </div>
      <div className={css.infoCont}>
        <h3>Subtotal:</h3>
        <p>${suma}</p>
        <h3>Costo de envío:</h3>
        <p>${envio}</p>
        <h2>Total:</h2>
        <p>${suma + envio}</p>

        {(userData.email && !userData.email.length) || !userData.email ? (
          <div className={css.mail}>
            <label htmlFor="email">Email: </label>
            <br />
            <i>Recuerda agregar tu email en tu información de perfil</i>
            <br />
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        <br />
        {userData.username ? (
          <>
            
              <button className={css.btn} onClick={(e) => handlePayment(e)}>
                Ir a pagar
              </button>
           
          </>
        ) : (
          "Inicia sesión para comprar"
        )}

        <br></br>
        <NavLink to={"/"} >
          <button className={css.btn}>Seguir comprando</button>
          
        </NavLink>
      </div>
    </div>
  );
}
