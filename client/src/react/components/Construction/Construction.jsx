import React from "react";
import constructionImage from "./enconstruccion.jpg";
import s from "./Construction.module.css";

export default function Construction() {
    return(
        <div className={s.principalDiv}>
            <img className={s.imageConstruction} src={constructionImage} alt="Img Construccion"/>
        </div>
    )
};