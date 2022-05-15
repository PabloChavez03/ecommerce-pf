import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getReviewsUser, updateReview } from "../../../../redux/actions-types";
import starBlack from "../../Reviews/images/estrella-transparent.png";
import starGold from "../../Reviews/images/estrella-dorada.png";
import style from "../../Reviews/CreateReviews/CreateReviews.module.css";

export default function UpdateReviews() {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const { username } = useSelector((state) => state.userData);
  const reviews = useSelector((state) => state.reviewsUser);

  const reviewsToUpdate = reviews.Reviews?.find((e) => e.id === reviewId);
  const [update, setUpdate] = useState({
    calification: reviewsToUpdate?.calification,
    comment: reviewsToUpdate?.comment,
  });
  useEffect(() => {
    dispatch(getReviewsUser(username));
  }, [username, dispatch, reviewId,update]);  

  const [reviewUpdate, setReviewUpdate] = useState({});

  const handleClickComment = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      comment: e.target.value,
    });
    setReviewUpdate({
      reviewId,
      changes: {
        calification: Number(update.calification),
        comment: e.target.value,
      },
    });
  };
  const handleClickScore = (e) => {
    e.preventDefault();
    setUpdate({
      ...update,
      calification: e.target.name,
    });
    setReviewUpdate({
      reviewId,
      changes: {
        calification: Number(e.target.name),
        comment: update.comment,
      },
    });
  };
  const handleClickSend = (e) => {
    e.preventDefault();
    console.log(reviewUpdate);
    dispatch(updateReview(reviewUpdate));
    window.history.back();
  };

  return (
    <div className={style.container}>
    <h3>Ingrese las modificaciones de su reseña:</h3>

    <h4>Comentarios:</h4>
    <textarea
      type="text"
      placeholder="Ingrese sus comentarios aquí"
      name="comment"
      value={update.comment}
      onChange={(e) => handleClickComment(e)}
      className={style.textArea}
    ></textarea>
    <h4>Calificación:</h4>
    <div className={style.imgContainer}>
      <img
        src={update.calification >= 1 ? starGold : starBlack}
        alt="star"
        className={style.imgStar}
        name={1}
        onClick={(e) => handleClickScore(e)}
      />
      <img
        src={update.calification >= 2 ? starGold : starBlack}
        alt="star"
        className={style.imgStar}
        name={2}
        onClick={(e) => handleClickScore(e)}
      />
      <img
        src={update.calification >= 3 ? starGold : starBlack}
        alt="star"
        className={style.imgStar}
        name={3}
        onClick={(e) => handleClickScore(e)}
      />
      <img
        src={update.calification >= 4 ? starGold : starBlack}
        alt="star"
        className={style.imgStar}
        name={4}
        onClick={(e) => handleClickScore(e)}
      />
      <img
        src={update.calification >= 5 ? starGold : starBlack}
        alt="star"
        className={style.imgStar}
        name={5}
        onClick={(e) => handleClickScore(e)}
      />
    </div>
    <button onClick={(e) => handleClickSend(e)} className={style.buttonSend}>
      ENVIAR CAMBIOS
    </button>
    <NavLink to={"/user/reviews"} style={{ textDecoration: "none" }}>
      <button className={style.buttonSend}>CANCELAR</button>
    </NavLink>
    </div>
  );
}
