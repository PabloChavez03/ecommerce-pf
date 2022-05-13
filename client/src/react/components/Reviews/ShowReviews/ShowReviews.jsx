import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDetails } from "../../../../redux/actions-types";
import CardReviews from "./CardReviews";

export default function ShowReviews({ productId }) {
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  console.log(pathname)
  useEffect(() => {
    dispatch(getDetails(productId));
  }, [productId, dispatch]);

  const productRender = useSelector((state) => state.details);
  const reviews = productRender.Reviews;

  return (
    <div>
      <h3>Reseñas del producto:</h3>
      {reviews?.length ? (
        <div>
          {productRender.Reviews.map((e)=>(
            <CardReviews
              UserUserName={e.UserUserName}
              comment={e.comment}
              calification={e.calification}
              pathname={pathname}
            />
          ))}
        </div>
      ) : (
        <h4>Aún no hay reseñas para este producto</h4>
      )}
    </div>
  );
}
