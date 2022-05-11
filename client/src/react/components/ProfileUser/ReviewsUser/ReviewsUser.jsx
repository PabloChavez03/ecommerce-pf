import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsUser } from "../../../../redux/actions-types";
import CardReviews from "../../Reviews/ShowReviews/CardReviews";


export default function ReviewsUser() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
console.log(userData)
  useEffect(() => {
    dispatch(getReviewsUser(userData.username));
  },[userData,dispatch]);

  const reviewsUser = useSelector((state) => state.reviewsUser);

  return (
    <div>
      {reviewsUser?.length ? (
        reviewsUser.map((e) => (
          <CardReviews
            UserUserName={e.UserUserName}
            comment={e.comment}
            calification={e.calification}
          />
        ))
      ) : (
        <p>No se encontraron reseñas</p>
      )}
    </div>
  );
}
