import React, { useEffect, useState } from "react";
//import style from "./CardDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../../redux/actions-types";
import NavBar from "../NavBar/NavBar";
import CreateReviews from "../Reviews/CreateReviews/CreateReviews";
import ShowReviews from "../Reviews/ShowReviews/ShowReviews";
import Card from "./Card";
import Loader from "../Loader/Loader.jsx";
import style from "./CardDetail.module.css";

export default function CardDetail() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [modalStatus, setModalStatus] = useState(false);

  useEffect(() => {
    dispatch(getDetails(productId));
  }, [dispatch, productId]);

  const productDetail = useSelector((state) => state.details);
  useEffect(() => {
    dispatch(getDetails(productId));
  }, [dispatch, productId]);
  return (
    <div>
      <NavBar />
      {!productDetail.name ? (
        <Loader />
      ) : (
        <div>
          <Card
            id={productDetail.id}
            name={productDetail.name}
            description={productDetail.description}
            gender={productDetail.gender}
            brandName={productDetail.brandName}
            images={productDetail.images}
            previousPrice={productDetail.previousPrice}
            isOffertProduct={productDetail.isOffertProduct}
            currentPrice={productDetail.currentPrice}
            color={productDetail.color}
            variants={productDetail.variants}
            info={productDetail.info}
          />
          <div className={style.containerReviews}>
            <CreateReviews
              productId={productId}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
            />
            <ShowReviews
              productId={productId}
              modalStatus={modalStatus}
              setModalStatus={setModalStatus}
            />
          </div>
        </div>
      )}
    </div>
  );
}
