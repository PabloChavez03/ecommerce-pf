import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDetails } from "../../../../redux/actions-types";
import CardReviews from "./CardReviews";
import ShowReviewsModalDelete from "./ShowReviewsModal/ShowReviewsModalDelete";
import back from "../../svg/back.png";
import next from "../../svg/next.png";
import style from "./ShowReviews.module.css";

export default function ShowReviews({
  productId,
  setModalStatus,
  modalStatus,
}) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const productRender = useSelector((state) => state.details);
  const reviews = productRender.Reviews;
  const [currentPageReview, setCurrentPageReview] = useState(1);
  const [reviewPerPage, setReviewPerPage] = useState(1);
  const lastReview = currentPageReview * reviewPerPage;
  const firstReview = lastReview - reviewPerPage;
  const reviewsCurrent = productRender?.Reviews.slice(firstReview, lastReview);
  const quantityPages = Math.ceil(productRender.Reviews.length);
  useEffect(() => {
    dispatch(getDetails(productId));
  }, [productId, dispatch, modalStatus]);

  const handleClickPrev = (e) => {
    e.preventDefault();
    if (currentPageReview - 1 < 1) {
      return;
    } else {
      setCurrentPageReview(currentPageReview - 1);
    }
  };

  const handleClickNext = (e) => {
    e.preventDefault();
    if ((currentPageReview + 1) >= quantityPages) {
      return;
    } else {
      setCurrentPageReview(currentPageReview + 1);
    }
  };
  return (
    <div className={style.container}>
      <h3>Todas las reseñas:</h3>
      {reviews?.length ? (
        <div className={style.container1}>
          <img
            src={back}
            alt="Arrow Left"
            onClick={(e) => handleClickPrev(e)}
            className={style.imgPaginated}
          />
          {reviewsCurrent?.map((e) => (
            <CardReviews
              key={e.UserUserName + e.comment}
              UserUserName={e.UserUserName}
              comment={e.comment}
              calification={e.calification}
              pathname={pathname}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
              id={e.id}
            />
          ))}
          <img
            src={next}
            alt="Arrow Rigth"
            onClick={(e) => handleClickNext(e)}
            className={style.imgPaginated}
          />
        </div>
      ) : (
        <h4>Aún no hay reseñas para este producto</h4>
      )}
    </div>
  );
}
