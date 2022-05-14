import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EmailPublicidad } from "../../../../redux/actions-types";
import style from "./EmailPublicidad.module.css";
import Preview from "./Preview/preview";
const PublicidadMail = () => {
  const [data, setData] = useState({
    emailGoogle: "",
    emailAsunto: "",
    emailImagenTitle: "",
    emailTitulo: "",
    emailSubTitle: "",
    emailDescription: "",
    emailButton: "",
  });
  const [viewP, setView] = useState(false);
  ///////////Dispatch
  const dispatch = useDispatch();
  //Funciones
  const handlePublicar = () => {
    dispatch(EmailPublicidad(data));
  };

  const handleView = () => {
    if (viewP) setView(false);
    else setView(true);
  };

  const handleInput = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  console.log(data)
  return (
    <div className={style.emailPublict}>
      {viewP ? <Preview handleView={handleView} data={data} /> : null}
      <nav className={style.navbar}>
        <h2>Correo Publicitario</h2>
        <div>
          <button className={style.p} onClick={() => handlePublicar()}>
            PUBLICAR
          </button>
          <button className={style.p} onClick={() => handleView()}>
            PREVIEW
          </button>
        </div>
      </nav>
      <div className={style.container}>
        <div className={style.card}>
          <label>Email</label>
          <input
            name={"emailGoogle"}
            type={"text"}
            value={data.emailGoogle}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          <label>Asunto</label>
          <input
            name={"emailAsunto"}
            type={"text"}
            value={data.emailAsunto}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          <label>Imagen</label>
          <input
            name={"emailImagenTitle"}
            type={"text"}
            value={data.emailImagenTitle}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          <label>Titulo de publicidad</label>
          <input
            name={"emailTitulo"}
            type={"text"}
            value={data.emailTitulo}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          <label>SubTitulo de publicidad</label>
          <input
            name={"emailSubTitle"}
            type={"text"}
            value={data.emailSubTitle}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          <label>Titulo de Description</label>
          <textarea
            name={"emailDescription"}
            className={style.input}
            placeholder={"Description del correo"}
            onChange={(e) => handleInput(e)}
            value={data.emailDescription}
          />
          <label>Boton del correo</label>
          <input
            name={"emailButton"}
            type={"text"}
            value={data.emailButton}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicidadMail;
