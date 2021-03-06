import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsUser } from "../../../../redux/actions-types";
import CardReviews from "../../Reviews/ShowReviews/CardReviews";
import deleteIcon from "../../../AdminComponents/Components/CardsAdmin/images/eliminar.png";
import editIcon from "../../../AdminComponents/Components/CardsAdmin/images/editar.png";
import { NavLink } from "react-router-dom";
import style from "./ReviewsUser.module.css";
import ShowReviewsModalDelete from "../../Reviews/ShowReviews/ShowReviewsModal/ShowReviewsModalDelete";

export default function ReviewsUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const [modalStatus, setModalStatus] = useState(false);
  useEffect(() => {
    dispatch(getReviewsUser(userData.username));
  }, [userData, dispatch, modalStatus]);

  let reviewsUser = useSelector((state) => state.reviewsUser).Reviews;
 
  useEffect(() => {
    dispatch(getReviewsUser(userData.username));
  }, [userData, dispatch, reviewsUser]);

  return (
    <div className={style.container}>
      {reviewsUser?.length ? (
        reviewsUser.map((e, i) => (
          <div key={i} className={style.container1}>
            <CardReviews
              UserUserName={e.UserUserName}
              comment={e.comment}
              calification={e.calification}
              id={e.id}
             
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
            />
          </div>
        ))
      ) : (
        <p>No se encontraron reseñas</p>
      )}
    </div>
  );
}
