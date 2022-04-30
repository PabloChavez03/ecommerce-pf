import React, { useEffect } from "react";
import styles from "./CardDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../../redux/actions-types";

export default function CardDetail() {
	const dispatch = useDispatch();
	const productDetail = useSelector((state)=>state.details);
	const {idProduct} = useParams();

	useEffect(() => {
        dispatch(getDetails(idProduct));
    }, [dispatch, idProduct]);
}