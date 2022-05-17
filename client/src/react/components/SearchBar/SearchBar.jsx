import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByName } from "../../../redux/actions-types";
import style from "./SearchBar.module.css";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import SuggestModal from "./SuggestModal/SuggestModal";

export default function SearchBar({ setSelectFilter }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);

  const handleChangeInput = (event) => {
    event.preventDefault();
    setSearch(event.target.value.toUpperCase());
    if (search !== "") {
      dispatch(getProductByName(search));
      setOptions(productsOption);
    }
  };

  const productsOption = useSelector((state) => state.productFilter);

  const handleClickSearch = (event) => {
    event.preventDefault();
    if (search === "") {
      Swal.fire("Debe ingresar un producto a buscar!", "", "success");
    } else {
      dispatch(getProductByName(search));
      setSearch("");
      setSelectFilter("search");
    }
  };
  useEffect(() => {
    if (search === "") {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [search, display]);
  const handleClickOut = () => {
    setDisplay(!display);
  };
  return (
    <div>
      <div onClick={handleClickOut}></div>
      <form className={style.searchContainer}>
        <input
          value={search}
          type={"search"}
          placeholder="Ingrese producto a buscar..."
          onChange={(e) => handleChangeInput(e)}
        />
        {display ? (
          <SuggestModal
            options={options}
            setOptions={setOptions}
            display={display}
            setDisplay={setDisplay}
          />
        ) : (
          ""
        )}
        <button onClick={(e) => handleClickSearch(e)}>BUSCAR</button>
      </form>
    </div>
  );
}
