import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PostChatBotReceptor } from "../../../../../../redux/actions-types";
import style from "./New.Receptor.module.css";
export default function NewReceptor({ handleNewReceptor }) {
  ///////////Dispatch
  const dispatch = useDispatch();
  //
  const [focusCheck, setFocusCheck] = useState({
    activo: true,
    desactivado: false,
  });
  const [respuesta, setRespuesta] = useState({
    name: "",
    isActive: focusCheck.activo,
  });
  /**FUNCION PARA VALIDAR EL MAYUS */
  const mayusculaSearch = (as) => {
    let arr = as.split(" ");
    let datoArr = [];
    arr.forEach((item) => {
      datoArr.push(item.charAt(0).toUpperCase() + item.slice(1));
    });
    return datoArr.join(" ");
  };
  /**HANDLERS PARA LOS INPUTS, SETEANDO EL VALOR DEL ESTADO */
  const handleInputChange = (e) => {
    setRespuesta({
      ...respuesta,
      [e.target.name]: mayusculaSearch(e.target.value),
    });
  };

  const handleCerrar = () => {
    handleNewReceptor();
  };
  const handleCheck = () => {
    if (focusCheck.activo) {
      setFocusCheck({
        activo: false,
        desactivado: true,
      });
      setRespuesta({
        ...respuesta,
        isActive: false,
      });
    } else {
      setFocusCheck({
        activo: true,
        desactivado: false,
      });
      setRespuesta({
        ...respuesta,
        isActive: true,
      });
    }
  };

  const handleEnviar = () => {
    if (respuesta.name !== "") {
      dispatch(PostChatBotReceptor(respuesta));
      setTimeout(() => {
        handleNewReceptor();
      }, 1000);
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.head}>
        <h1>New Emisor</h1>
        <p onClick={() => handleCerrar()}>X</p>
      </div>
      <div>
        <label>Name:</label>
        <input
          className={style.title}
          type={"text"}
          name="name"
          placeholder={"Name"}
          value={respuesta.name}
          onChange={(e) => handleInputChange(e)}
        />
        <div className={style.containerCheck}>
          <div>
            <input
              type={"checkbox"}
              value={"Activo"}
              checked={focusCheck.activo}
              onChange={() => handleCheck()}
            />
            <label> Activo</label>
          </div>
          <div>
            <input
              type={"checkbox"}
              value={"Activo"}
              checked={focusCheck.desactivado}
              onChange={() => handleCheck()}
            />
            <label> Desactivado</label>
          </div>
        </div>
        <input
          className={style.btn}
          type={"button"}
          value={"Agregar"}
          onClick={() => handleEnviar()}
        />
      </div>
    </div>
  );
}
