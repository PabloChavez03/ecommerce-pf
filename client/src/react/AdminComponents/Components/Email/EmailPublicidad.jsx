import React, { useEffect, useState } from "react";
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
  const [error, setError] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  ///////////Dispatch
  const dispatch = useDispatch();
  //Validaciones
  function validate(data) {
    let errors = {};

    if (!data.emailGoogle)
      errors.emailGoogle = "Es necesario ingresar tu correo electronico";
    if (
      !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
        data.emailGoogle
      )
    )
      errors.emailGoogle = "El correo brindado no es valido";
    if (!data.emailAsunto)
      errors.emailAsunto = "En necesario ingresar el asunto";
    if (!data.emailTitulo)
      errors.emailTitulo = "En necesario ingresar la descripcion";
    if (!data.emailSubTitle)
      errors.emailSubTitle = "En necesario ingresar la descripcion";
    if (!data.emailDescription)
      errors.emailDescription = "En necesario ingresar la descripcion";
    return errors;
  }
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
    setError(
      validate({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };
  /**Boton  */

  useEffect(() => {
    if (
      data.emailGoogle === "" ||
      error.hasOwnProperty("emailGoogle") ||
      error.hasOwnProperty("emailAsunto") ||
      error.hasOwnProperty("emailTitulo") ||
      error.hasOwnProperty("emailSubTitle") ||
      error.hasOwnProperty("emailDescription") ||
      error.hasOwnProperty("emailImagenTitle") ||
      error.hasOwnProperty("emailButton")
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [error, data, setDisabledButton]);

  return (
    <div className={style.emailPublict}>
      {viewP ? <Preview handleView={handleView} data={data} /> : null}
      <nav className={style.navbar}>
        <h2>Correo Publicitario</h2>
        <div>
          <button
            disabled={disabledButton}
            className={style.p}
            onClick={() => handlePublicar()}
          >
            PUBLICAR
          </button>
          <button className={style.p} onClick={() => handleView()}>
            PREVIEW
          </button>
        </div>
      </nav>
      <div className={style.container}>
        <div className={style.card}>
          {/** Correo */}
          <label>Email</label>
          <input
            name={"emailGoogle"}
            type={"text"}
            value={data.emailGoogle}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          {error.emailGoogle && (
            <p className={style.error}>{error.emailGoogle}</p>
          )}
          {/** Asunto */}
          <label>Asunto</label>
          <input
            name={"emailAsunto"}
            type={"text"}
            value={data.emailAsunto}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          {error.emailAsunto && (
            <p className={style.error}>{error.emailAsunto}</p>
          )}
          {/** Imagen */}
          <label>Imagen</label>
          <input
            name={"emailImagenTitle"}
            type={"text"}
            value={data.emailImagenTitle}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          {error.emailImagenTitle && (
            <p className={style.error}>{error.emailImagenTitle}</p>
          )}
          {/** Titulo */}
          <label>Titulo de publicidad</label>
          <input
            name={"emailTitulo"}
            type={"text"}
            value={data.emailTitulo}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          {error.emailTitulo && (
            <p className={style.error}>{error.emailTitulo}</p>
          )}
          {/** Sub Title */}
          <label>SubTitulo de publicidad</label>
          <input
            name={"emailSubTitle"}
            type={"text"}
            value={data.emailSubTitle}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          {error.emailSubTitle && (
            <p className={style.error}>{error.emailSubTitle}</p>
          )}
          {/** Description */}
          <label>Description</label>
          <textarea
            name={"emailDescription"}
            className={style.input}
            placeholder={"Description del correo"}
            onChange={(e) => handleInput(e)}
            value={data.emailDescription}
          />
          {error.emailDescription && (
            <p className={style.error}>{error.emailDescription}</p>
          )}
          {/** Boton */}
          <label>Boton del correo</label>
          <input
            name={"emailButton"}
            type={"text"}
            value={data.emailButton}
            className={style.input}
            onChange={(e) => handleInput(e)}
          />
          {error.emailButton && (
            <p className={style.error}>{error.emailButton}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicidadMail;
