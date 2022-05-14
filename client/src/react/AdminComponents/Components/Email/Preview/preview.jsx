import React from "react";
import { Link } from "react-router-dom";
import style from "./preview.module.css";
const Preview = ({ handleView, data }) => {
  return (
    <div className={style.modal}>
      <div className={style.hear}>
        <div>
          <p className={style.footerP}>
            De: {`CLOTHES 22 <kennethmazuelosvarga.km@gmail.com>`}
          </p>
          <p className={style.footerP}>Para: {data.emailGoogle}</p>
          <p className={style.footerP}>Asunto: {data.emailAsunto}</p>
        </div>
        <button className={style.button} onClick={() => handleView()}>
          Close
        </button>
      </div>
      <hr />
      <br />
      <div className={style.container}>
        <div className={style.containermarca}>
          <h1 className={style.marca}>CLOTHES 22</h1>
        </div>
        <div className={style.description}>
          <h2 className={style.title}>{data.emailTitulo}</h2>
          <p>{data.emailSubTitle}</p>
          {data.emailImagenTitle ? (
            <img className={style.img} src={data.emailImagenTitle} alt="" />
          ) : null}
          <p>{data.emailDescription}</p>
          <br />
          <Link className={style.a} to={"/home"}>
            {data.emailButton ? data.emailButton : "Compra ya!"}
          </Link>
        </div>
        <hr className={style.hr} />
        <footer className={style.footer}>
          <p className={style.footerP}>
            Si necesitas asistencia tecnica, ponte en contacto con la{" "}
            <Link to={"/home"} className={style.footerA}>
              Ayuda de CLOTHES 22
            </Link>
          </p>
          <p className={style.footerP}>
            <b>CLOTHES 22</b> te notificara la actividad nueva relacionada
            contigo. Puedes personalizar estos correos elentronico o
            desactiarlos en cualquier momento.
          </p>
          <p className={style.footerP}>
            Tu uso de <b>CLOTHES 22</b> esta sujeto a las condiciones del
            servicio y la Politica de privacidad de las Normas de la comunidad
            de <b>CLOTHES 22</b>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Preview;
