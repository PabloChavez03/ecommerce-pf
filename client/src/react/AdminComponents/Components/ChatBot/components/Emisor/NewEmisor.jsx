import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetChatBotReceptorName,
  PostChatBotEmisor,
  AllChatBotEmisor,
} from "../../../../../../redux/actions-types";
import style from "./NewEmisor.module.css";
export default function NewEmisor({ handleNewEmisor }) {
  //Dispath reducer
  const dispatch = useDispatch();
  const ReceptorName = useSelector((state) => state.chatBotReceptorName);
  const emisor = useSelector((state) => state.chatBotEmisor);
  const [focusCheck, setFocusCheck] = useState({
    activo: true,
    desactivado: false,
  });
  const [respuesta, setRespuesta] = useState({
    name: "",
    respuesta: "",
    isActive: focusCheck.activo,
    receptor: [],
  });
  //const [Preguntav1, setPreguntav1] = useState([]);
  //Dispath useEffect
  useEffect(() => {
    dispatch(GetChatBotReceptorName());
    dispatch(AllChatBotEmisor());
  }, [dispatch]);
  //
  let Preguntav1 = [...ReceptorName];
  if (emisor.length !== 0) {
    emisor.forEach((item) => {
      let position = Preguntav1.indexOf(item.name);
      Preguntav1.splice(position, 1);
    });
  }

  const Preguntav2 = [...ReceptorName];
  if (respuesta.name) {
    let position = Preguntav2.indexOf(respuesta.name);
    Preguntav2.splice(position, 1);
  }
  //
  const handleCerrar = () => {
    handleNewEmisor();
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "selectPregunta") {
      setRespuesta({ ...respuesta, [e.target.name]: e.target.value });
    } else {
      setRespuesta({ ...respuesta, [e.target.name]: "" });
    }
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

  const handleSelect = (e) => {
    e.preventDefault();
    if (e.target.value !== "select") {
      if (!respuesta.receptor.includes(e.target.value)) {
        setRespuesta({
          ...respuesta,
          receptor: [...respuesta.receptor, e.target.value],
        });
      }
    }
  };

  const handleDelete = (e) => {
    let newdato = [...respuesta.receptor];
    let position = newdato.indexOf(e.target.innerHTML);
    newdato.splice(position, 1);
    setRespuesta({ ...respuesta, receptor: newdato });
  };
  const handleEnviar = () => {
    if (respuesta.respuesta !== "") {
      dispatch(PostChatBotEmisor(respuesta));
      handleNewEmisor();
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.head}>
        <h1>Insertar Pregunta</h1>
        <p onClick={() => handleCerrar()}>X</p>
      </div>
      <div>
        <select
          className={style.title}
          name={"name"}
          value={respuesta.name}
          onChange={(e) => handleInputChange(e)}
        >
          <option value={"selectPregunta"}>Seleccion de alternativa</option>
          {Preguntav1.length === 0
            ? null
            : Preguntav1.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
        </select>
        <br />
        <label>Respuesta</label>
        <input
          className={style.respuesta}
          type={"text"}
          name={"respuesta"}
          value={respuesta.respuesta}
          placeholder={"Respuesta"}
          onChange={(e) => handleInputChange(e)}
        />
        <br />
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
        <div>
          <label>Sub Alternativa:</label>{" "}
          <select defaultValue={"select"} onChange={(e) => handleSelect(e)}>
            <option value={"select"}>Seleccion de alternativa</option>
            {Preguntav2.length === 0
              ? null
              : Preguntav2.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
          </select>
        </div>
        <div className={style.containerSelect}>
          {respuesta.receptor?.map((item) => (
            <p className={style.p} key={item} onClick={(e) => handleDelete(e)}>
              {item}
            </p>
          ))}
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
