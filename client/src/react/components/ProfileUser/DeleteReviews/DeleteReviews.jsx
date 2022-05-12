import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteReview } from "../../../../redux/actions-types";
import alert from "../../svg/advertencia.png"

export default function DeleteReviews() {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const navigate = useNavigate();

  console.log(reviewId)
  const handleClickConfirm = (event) => {
    event.preventDefault();
    dispatch(deleteReview(reviewId));
    alert("Reseña eliminada con exito!");
    navigate("/user/reviews")
  };

  return (
    <div>
      <div>
        <h2>Desea eliminar este producto?</h2>
        <div>
          <img src={alert} alt="Img alert" style={{width:"25px"}}/>
          <h5>ADVERTENCIA: Los datos no podrán recuperarse.</h5>
        </div>
        <div>
          <button onClick={(e) => handleClickConfirm(e)}>Confirmar</button>
          <NavLink to={`/user/reviews`} style={{ textDecoration: "none" }}>
            <button>Cancelar</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
