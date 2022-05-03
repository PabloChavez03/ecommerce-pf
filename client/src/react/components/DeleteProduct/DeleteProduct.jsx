import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteProduct } from "../../../redux/actions-types";

export default function DeleteProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state)=> state.products);
  let gender = allProducts.find((e)=> e.id === parseInt(productId));
  gender = gender.Categories[0].genre;
  gender = gender[0].toUpperCase() + gender.slice(1);

  const handleClickSi = (event) => {
    event.preventDefault();
    dispatch(deleteProduct(productId));
    alert("Producto eliminado exitosamente");
    navigate("/")
  };

  return (
    <div>
      <div>
      <NavLink to={`/home?gender=${gender}`} style={{ textDecoration: "none" }}>
          <button>ATRAS</button>
        </NavLink>
        <h4>Confirma la eliminación del producto?</h4>
        <h5>Advertencia: Los datos no podrán recuperarse.</h5>
        <button onClick={(e) => handleClickSi(e)}>Si</button>
        <NavLink to={`/`} style={{ textDecoration: "none" }}>
          <button>No</button>
        </NavLink>
      </div>
    </div>
  );
}
