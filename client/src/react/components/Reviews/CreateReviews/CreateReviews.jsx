import React, { useEffect, useState } from "react";
import starBlack from "../images/estrella-transparent.png";
import starGold from "../images/estrella-dorada.png";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreateReviews.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { createReview, getDetails } from "../../../../redux/actions-types";
import Swal from 'sweetalert2'

export default function CreateReviews({ productId }) {
  const dispatch = useDispatch();
  const [score, setScore] = useState(0);
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const [review, setReview] = useState({
    user_name: userData.username,
    productId: productId,
    calification: 0,
    comment: "",
  });
  const handleClickSend = (event) => {
    event.preventDefault();
    if (!userData.username) {
      Swal.fire(
        'Debe registrarse y/o iniciar sesión para dejar una reseña!',
        '',
        'success'
      )
      navigate("/login");
    }
    if (userData.rol === "admin") {
      Swal.fire(
        'No te pases de listo admin, los reviews solo los puede dejar el cliente!',
        '',
        'error'
      )
    } else {
      if (score === 0) {
        Swal.fire(
          'Por favor seleccionar calificación!',
          '',
          'success'
        )
      }
      if (review.comment === "") {
        Swal.fire(
          'Debe ingresar a su cueta!',
          '',
          'warning'
        )
      } else if (score !== 0 && review.comment !== "") {
        if (userData.username) {
          dispatch(createReview(review));
          setScore(0);
          setReview({
            UserUserName: userData.username,
            productId: productId,
            calification: 0,
            comment: "",
          });
          Swal.fire(
            'Tu reseña fue enviada con éxito. Muchas gracias!',
            '',
            'success'
          )
          dispatch(getDetails(productId));
        }
      }
    }
  };

  const handleClickScore = (event) => {
    event.preventDefault();
    setScore(event.target.name);
    setReview({
      ...review,
      calification: event.target.name,
    });
  };

  const handleClickComment = (event) => {
    event.preventDefault();
    setReview({
      ...review,
      comment: event.target.value,
    });
  };

  useEffect(() => {}, [score]);

  return (
    <div className={style.container}>
      <h3>Te gustaría compartir tu opinión sobre este producto?</h3>
      {!userData.username ? (
        <div>
          <p>
            Inicia sesión o registrate para poder dejar una reseña dando click
          </p>
          <NavLink to="/login">aquí</NavLink>
        </div>
      ) : null}
      <h4>Comentarios:</h4>
      <textarea
        type="text"
        placeholder="Ingrese sus comentarios aquí"
        name="comment"
        value={review.comment}
        onChange={(e) => handleClickComment(e)}
        className={style.textArea}
      ></textarea>
      <h4>Calificación:</h4>
      <div className={style.imgContainer}>
        <img
          src={score >= 1 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={1}
          onClick={(e) => handleClickScore(e)}
        />
        <img
          src={score >= 2 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={2}
          onClick={(e) => handleClickScore(e)}
        />
        <img
          src={score >= 3 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={3}
          onClick={(e) => handleClickScore(e)}
        />
        <img
          src={score >= 4 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={4}
          onClick={(e) => handleClickScore(e)}
        />
        <img
          src={score >= 5 ? starGold : starBlack}
          alt="star"
          className={style.imgStar}
          name={5}
          onClick={(e) => handleClickScore(e)}
        />
      </div>
      <button onClick={(e) => handleClickSend(e)} className={style.buttonSend}>
        ENVIAR
      </button>
    </div>
  );
}
