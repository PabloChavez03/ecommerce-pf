import React from "react";
import style from "./NewEmisor.module.css";
export default function NewEmisor() {
  return (
    <div className={style.modal}>
      <div className={style.head}>
        <h1>New Emisor</h1>
        <p>X</p>
      </div>
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
      <div>
        <div>
          <input type={"checkbox"} value={"Activo"} />
          <label> Activo</label>
        </div>
        <div>
          <input type={"checkbox"} value={"Activo"} />
          <label> Desactivado</label>
        </div>
      </div>
      <br />
      <label>Receptor</label>
      <select>
        <option></option>
      </select>
      <input type={"button"} value={"Agregar"} />
    </div>
  );
}
