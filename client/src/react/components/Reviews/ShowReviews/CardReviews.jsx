import React from "react";
import AccountIcon from "../../svg/AccountIcon";
import starBlack from "../images/estrella-transparent.png";
import starGold from "../images/estrella-dorada.png";
import style from "./CardReviews.module.css";
import editIcon from "../../../AdminComponents/Components/CardsAdmin/images/editar.png";
import deleteIcon from "../../../AdminComponents/Components/CardsAdmin/images/eliminar.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../../../redux/actions-types";
import Swal from "sweetalert2";

export default function CardReviews({
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
      <div><AccountIcon /><h4>{UserUserName}</h4></div>
      
      <div className={style.container1}>
      
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
        {UserUserName === userData ? (
          <div>
            <NavLink to={`/user/reviews/update/${id}`}>
              <img src={editIcon} alt="Icon Edit" className={style.imgStar} />
            </NavLink>

            <img
              src={deleteIcon}
              alt="Icon Delete"
              className={style.imgStar}
              onClick={(e) => handleClickConfirm(e)}
            />
          </div>
        ) : null}
      
      </div>
    </div>
  );
}
