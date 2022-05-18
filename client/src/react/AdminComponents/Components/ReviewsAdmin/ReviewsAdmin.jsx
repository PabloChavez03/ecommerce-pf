import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getDetails } from "../../../../redux/actions-types";
import CardReviewsAdmin from "./CardReviewsAdmin/CardReviewsAdmin";
import style from "./ReviewsAdmin.module.css";
import back from "../../../components/svg/volver-flecha.png";

export default function ReviewsAdmin() {
  const dispatch = useDispatch();
  const { idReview } = useParams();
  const [modalStatus, setModalStatus] = useState(false);
  useEffect(() => {
    dispatch(getDetails(idReview));
  }, [dispatch, idReview]);

  const reviewsFilter = useSelector((state) => state.details).Reviews;

  return (
    <div className={style.container}>
        <div className={style.imgContainer}>
      <NavLink to={`/admin/allproducts`} style={{ textDecoration: "none" }}>
        <img src={back} alt="Img back" className={style.imgBack} />
      </NavLink>
      </div>
      <h2>Reseñas</h2>
      <div className={style.container1}>
        {reviewsFilter?.length ? (
          reviewsFilter.map((e) => (
            <CardReviewsAdmin
              key={e.UserUserName + e.comment}
              UserUserName={e.UserUserName}
              comment={e.comment}
              calification={e.calification}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              id={e.id}
            />
          ))
        ) : (
          <h2>No hay reseñas para este producto</h2>
        )}
      </div>
    </div>
  );
}
