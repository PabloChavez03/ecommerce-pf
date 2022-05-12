import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsUser } from "../../../../redux/actions-types";
import CardReviews from "../../Reviews/ShowReviews/CardReviews";
import deleteIcon from "../../../AdminComponents/Components/CardsAdmin/images/eliminar.png";
import editIcon from "../../../AdminComponents/Components/CardsAdmin/images/editar.png";
import { NavLink } from "react-router-dom";

export default function ReviewsUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    dispatch(getReviewsUser(userData.username));
  }, [userData, dispatch]);

  const reviewsUser = useSelector((state) => state.reviewsUser).Reviews;
  console.log(reviewsUser);
  return (
    <div>
      {reviewsUser?.length ? (
        reviewsUser.map((e, i) => (
          <div key={i}>
            <CardReviews
              UserUserName={e.UserUserName}
              comment={e.comment}
              calification={e.calification}
            />
            <img src={editIcon} alt="edit icon"/>
            <NavLink to={`/user/reviews/delete/${e.id}`}>
            <img src={deleteIcon} alt="edit icon"/>
            </NavLink>
          </div>
        ))
      ) : (
        <p>No se encontraron reseñas</p>
      )}
    </div>
  );
}
