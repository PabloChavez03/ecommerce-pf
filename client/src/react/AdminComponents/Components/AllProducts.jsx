import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions-types";
import CardAdmin from "./CardAdmin";

export default function AllProducts() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      {allProducts.length
        ? allProducts.map((e) => (
            <div key={e.id}>
              <CardAdmin
                id={e.id}
                name={e.name}
                currentPrice={e.currentPrice}
              />
            </div>
          ))
        : null}
    </div>
  );
}
