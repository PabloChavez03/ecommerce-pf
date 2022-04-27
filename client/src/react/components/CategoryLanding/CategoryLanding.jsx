import React from "react";
import { NavLink } from "react-router-dom";
import man from "./man.png";
import woman from "./woman.png";
import kids from "./children.png";
import css from "./CategoryLanding.module.css";

function CategoryLanding() {
  let arr = [
    { name: "Men", img: man },
    { name: "Women", img: woman },
    { name: "Kids", img: kids },
  ];
  return (
    <div className={css.container}>
      <h1 className={css.title}>Categorias:</h1>
      <br />
      <div className={css.catCont}>
        {arr?.map((e) => {
          return (
            <NavLink key={e.name} to={"/"}>
              <div className={css.category}>
                <div>
                  <img className={css.img} src={e.img} alt="img" />
                  <h1 className={css.name}>{e.name}</h1>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryLanding;
