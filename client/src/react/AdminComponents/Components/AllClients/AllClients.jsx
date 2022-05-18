import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  deleteUser,
  getAllClients,
  resetAllClients,
  sendMailResetPassword,
} from "../../../../redux/actions-types";
import s from "./allClients.module.css";
import deleteIcon from "../CardsAdmin/images/quitar-usuario.png";
import Swal from "sweetalert2";
import resetIcon from "../CardsAdmin/images/reload.png";

export default function AllClients() {
  const dispatch = useDispatch();
  const { token, username } = useSelector((state) => state.userData);
  const [userReset, setUserReset] = useState({
    email: "",
    linkPassword: "",
  });
  useEffect(() => {
    dispatch(getAllClients(token));

    return () => {
      dispatch(resetAllClients());
    };
  }, [dispatch, token]);

  const allClients = useSelector((state) => state.allClients);
  // useEffect(()=> {
  //   dispatch(getAllClients(token));
  // },[allClients, token, dispatch])
  const handleClickDeleteUser = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "¿Seguro desea eliminar el usuario?",
      text: "Una vez aceptado no se pueden revertir los cambios!",
      icon: "No",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(token, event.target.name));
        Swal.fire(
          "Confirmado!",
          "Su producto fue eliminado con éxito!",
          "success"
        );
      }
    });
  };
  const handleClickResetPassword = (event) => {
    event.preventDefault();
    console.log(event.target.id)
    setUserReset({
      ...userReset,
      email: event.target.name,
      linkPassword: `http://localhost:3000/user/changepassword/${event.target.id}`
    });
    dispatch(sendMailResetPassword(userReset));
    Swal.fire("Mail enviado con éxito!", "", "success");
  };
  return (
    <div className={s.container}>
      <h1>Todos mis clientes</h1>
      <div className={s.cardsContainer}>
        {allClients.map((client) => {
          return (
            <div key={client.user_name} className={s.card}>
              {client.user_name !== username ? (
                <div className={s.containerImg}>
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    className={s.imgDelete}
                    onClick={(event) => handleClickDeleteUser(event)}
                    name={client.user_name}
                  />
                </div>
              ) : (
                ""
              )}
              {client.email !== null ? (
                <div className={s.containerImg}>
                  <img
                    src={resetIcon}
                    alt="reset icon"
                    className={s.imgReset}
                    onClick={(event) => handleClickResetPassword(event)}
                    name={client.email}
                    id={client.user_name}
                  />
                </div>
              ) : (
                ""
              )}
              <NavLink to={`/admin/clients/${client.user_name}`}>
                <h3 className={s.name}>
                  {client.name && client.lastname
                    ? `${client.name} ${client.lastname}`
                    : client.name
                    ? client.name
                    : client.user_name}
                </h3>
              </NavLink>
              <p>
                <span className={s.tag}>Nombre de usuario:</span>{" "}
                {client.user_name}
              </p>
              <p>
                <span className={s.tag}>DNI:</span> {client.dni_client}
              </p>
              <p>
                <span className={s.tag}>Direccion:</span> {client.address}
              </p>
              <p>
                <span className={s.tag}>E-mail:</span> {client.email}
              </p>
              <p>
                <span className={s.tag}>Celular:</span> {client.phone}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
