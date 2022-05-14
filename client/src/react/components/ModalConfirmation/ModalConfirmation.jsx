import React from "react";
import style from "./ModalConfirmation.module.css";

export default function ModalConfirmation({ /*message*/ status, setStatus }) {
    // console.log(message)
  const handleModalStatus = (e) => {
    e.preventDefault();
    setStatus(!status);
  };
  return (
    <div className={style.container}>
      <h4 className={style.confirmation}>Puede ser que aca haya un error</h4>
      <button onClick={(e) => handleModalStatus(e)} className={style.buttons}>
        ACEPTAR
      </button>
    </div>
  );
}
