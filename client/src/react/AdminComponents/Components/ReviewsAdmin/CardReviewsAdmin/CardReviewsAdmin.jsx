import React from "react";
import AccountIcon from "../../../../components/svg/AccountIcon";
import starBlack from "../../../../components/Reviews/images/estrella-transparent.png";
import starGold from "../../../../components/Reviews/images/estrella-dorada.png";
import style from "./CardReviewsAdmin.module.css";
import deleteIcon from "../../../Components/CardsAdmin/images/eliminar.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteReview } from "../../../../../redux/actions-types";

export default function CardReviewsAdmin({
  UserUserName,
  comment,
  calification,
  id,
  modalStatus,
  setModalStatus,
}) {
  const userData = useSelector((state) => state.userData).username;
  const dispatch = useDispatch();

  function handleClickConfirm(e) {
    e.preventDefault();
    setModalStatus(!modalStatus);
    Swal.fire({
      title: "¿Seguro desea eliminar esta reseña?",
      text: "Una vez aceptado no se pueden revertir los cambios!",
      icon: "No",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(id));

        Swal.fire(
          "Confirmado!",
          "Su reseña fue eliminada con éxito!",
          "success"
        );
      }
    });
  }
  return (
    <div className={style.container}>
      
      <AccountIcon />
      <div className={style.container1}>
      <h4>Usuario: {UserUserName}</h4>
      <br/>
      <h4>Comentario:</h4>
      <span>{comment}</span>
      <br/>
      <h4>Calificación:</h4>
      <div className={style.imgContainer}>
        <img
          src={calification >= 1 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={1}
        />
        <img
          src={calification >= 2 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={2}
        />
        <img
          src={calification >= 3 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={3}
        />
        <img
          src={calification >= 4 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={4}
        />
        <img
          src={calification >= 5 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={5}
        />
        </div>
          <div>
            <img
              src={deleteIcon}
              alt="Icon Delete"
              className={style.imgStar}
              onClick={(e) => handleClickConfirm(e)}
            />
          </div> 
      </div>
    </div>
  );
}
