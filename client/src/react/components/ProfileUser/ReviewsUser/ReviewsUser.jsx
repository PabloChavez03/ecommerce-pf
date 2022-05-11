import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsUser } from "../../../../redux/actions-types";
import CardReviews from "../../Reviews/ShowReviews/CardReviews";
import deleteIcon from "../../../AdminComponents/Components/CardsAdmin/images/eliminar.png";
import editIcon from "../../../AdminComponents/Components/CardsAdmin/images/editar.png";

export default function ReviewsUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    dispatch(getReviewsUser(userData.username));
  }, [userData, dispatch]);

  const reviewsUser = useSelector((state) => state.reviewsUser).Reviews;
  console.log(userData);
  return (
    <div>
      {reviewsUser?.length ? (
        reviewsUser.map((e) => (
          <div>
            <CardReviews
              UserUserName={e.UserUserName}
              comment={e.comment}
              calification={e.calification}
            />
            <img src={editIcon} alt="edit icon"/>
            <img src={deleteIcon} alt="edit icon"/>
          </div>
        ))
      ) : (
        <p>No se encontraron reseñas</p>
      )}
    </div>
  );
}
