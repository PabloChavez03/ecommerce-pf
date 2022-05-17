import React from "react";
import { NavLink } from "react-router-dom";
import style from "./SuggestModal.module.css";

export default function SuggestModal({
  options,
  setOptions,
  display,
  setDisplay,
}) {
  return (
    <div className={style.modalStockProductContainerOverlay}>
      <div className={style.modalStockProductContainer}>
        <div className={style.modalHeader}></div>
        <div className={style.listItems}>
          {options?.length &&
            options.map((e) => (
              <div>
                <NavLink
                  to={`/detail/${e.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h3>{e.name}</h3>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
