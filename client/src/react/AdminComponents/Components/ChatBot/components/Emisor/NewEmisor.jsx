import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetChatBotReceptorName } from "../../../../../../redux/actions-types";
import style from "./NewEmisor.module.css";
export default function NewEmisor({ handleNewEmisor }) {
  const [focusCheck, setFocusCheck] = useState({
    activo: true,
    desactivado: false,
  });
  const [selectBD, setSelect] = useState([]);
  //Dispath reducer
  const dispatch = useDispatch();
  const ReceptorName = useSelector((state) => state.chatBotReceptorName);
  //Dispath useEffect
  useEffect(() => {
    dispatch(GetChatBotReceptorName());
  }, [dispatch]);

  const handleCerrar = () => {
    handleNewEmisor();
  };
  const handleCheck = () => {
    if (focusCheck.activo) {
      setFocusCheck({
        activo: false,
        desactivado: true,
      });
    } else {
      setFocusCheck({
        activo: true,
        desactivado: false,
      });
    }
  };

  const handleSelect = (e) => {
    e.preventDefault();
    if (e.target.value !== "select") {
      if (!selectBD.includes(e.target.value)) {
        setSelect([...selectBD, e.target.value]);
      }
    }
  };

  const handleDelete = (e) => {
    let newdato = [...selectBD];
    let position = newdato.indexOf(e.target.innerHTML);
    newdato.splice(position, 1);
    setSelect(newdato);
  };
  return (
    <div className={style.modal}>
      <div className={style.head}>
        <h1>New Emisor</h1>
        <p onClick={() => handleCerrar()}>X</p>
      </div>
      <div>
        <label>Name:</label>
        <input className={style.title} type={"text"} placeholder={"Title"} />
        <br />
        <label>Respuesta</label>
        <input
          className={style.respuesta}
          type={"text"}
          placeholder={"Respuesta"}
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
          <label>Receptor </label>
          <select defaultValue={"select"} onChange={(e) => handleSelect(e)}>
            <option value={"select"}>Seleccione el receptor</option>
            {ReceptorName.length === 0
              ? null
              : ReceptorName.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
          </select>
        </div>
        <div className={style.containerSelect}>
          {selectBD?.map((item) => (
            <p className={style.p} key={item} onClick={(e) => handleDelete(e)}>
              {item}
            </p>
          ))}
        </div>
        <input className={style.btn} type={"button"} value={"Agregar"} />
      </div>
    </div>
  );
}
