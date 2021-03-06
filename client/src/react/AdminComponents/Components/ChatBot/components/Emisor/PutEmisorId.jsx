import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetChatBotReceptorName,
  PutChatBotEmisor,
} from "../../../../../../redux/actions-types";
import style from "./NewEmisor.module.css";
export default function PutEmisor({
  handleEdit,
  id,
  name,
  respuestadata,
  isActive,
  alternativa,
}) {
  //Dispath reducer
  const dispatch = useDispatch();
  const ReceptorName = useSelector((state) => state.chatBotReceptorName);
  const [focusCheck, setFocusCheck] = useState({
    activo: true,
    desactivado: false,
  });
  const [respuesta, setRespuesta] = useState({
    id: id,
    name: name,
    respuesta: respuestadata,
    isActive: isActive,
    receptor: alternativa,
  });
  const [pregunta, setPregunta] = useState(true);
  console.log(respuesta);
  //Dispath useEffect
  useEffect(() => {
    dispatch(GetChatBotReceptorName());
  }, [dispatch]);

  //

  const Preguntav2 = [...ReceptorName];
  if (respuesta.name) {
    let position = Preguntav2.indexOf(respuesta.name);
    Preguntav2.splice(position, 1);
  }
  //
  const handleCerrar = () => {
    handleEdit();
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setRespuesta({ ...respuesta, [e.target.name]: e.target.value });
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
      dispatch(PutChatBotEmisor(respuesta));
      setTimeout(() => {
        handleEdit();
      }, 1000);
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.head}>
        <h1>Insertar Pregunta</h1>
        <p onClick={() => handleCerrar()}>X</p>
      </div>
      <div>
        <input
          className={style.title}
          name={"name"}
          value={respuesta.name}
          // onChange={(e) => handleInputChange(e)}
          disabled={pregunta}
        />

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
          <label>Sub Alternativa: </label>
          <select defaultValue={"select"} onChange={(e) => handleSelect(e)}>
            <option value={"select"}>Seleccione el receptor</option>
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
