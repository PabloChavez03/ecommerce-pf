import React from "react";
import AccountIcon from "../../svg/AccountIcon";
import starBlack from "../images/estrella-transparent.png";
import starGold from "../images/estrella-dorada.png";
import style from "./CardReviews.module.css";

export default function CardReviews({ UserUserName, comment, calification }) {
    console.log(calification)
    console.log(typeof calification)
  return (
    <div>
      <AccountIcon />
      <h4>Usuario:</h4>
      <p>{UserUserName}</p>
      <h4>Comentario:</h4>
      <span>{comment}</span>
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
    </div>
  );
}
