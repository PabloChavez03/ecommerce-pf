import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByPaymentId } from "../../../../redux/actions-types";
import style from "../../../components/SearchBar/SearchBar.module.css";
//import lupa from "../../../components/svg/buscar.png";
import Swal from 'sweetalert2'

export default function SearchBarOrders() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { token } = useSelector((state) => state.userData);

  const handleChangeInput = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  // console.log(search)
  const handleClickSearch = (event) => {
    event.preventDefault();
    if (search === "") {
      Swal.fire(
        'Debe ingresar un numero de Orden!',
        '',
        'success'
        )
    } else {
      dispatch(getOrdersByPaymentId(token,search));
      setSearch("");
    }
  };

  return (
    <div>
      <form className={style.searchContainer}>
        <input
          value={search}
          type={"search"}
          placeholder="Ingrese N° de Orden..."
          onChange={(e) => handleChangeInput(e)}
          className={style.inputSearch}
        />
        <button onClick={(e) => handleClickSearch(e)}>BUSCAR</button>
        {/* <img className={style.imgSearch} src={lupa} alt="Search" onClick={(e)=>handleClickSearch(e)}/> */}
      </form>
    </div>
  );
}
