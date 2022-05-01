import React, { useEffect, useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import { NavLink } from "react-router-dom";

export default function Slider({ gender, category }) {
  const [slideIndex, setSlideIndex] = useState(1);

  ///////////////////////////////////////
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  });

  //////////////////////////////////////////////
  const nextSlide = () => {
    if (slideIndex !== category?.img.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === category?.img.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(category?.img.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };


  return (
    <div className="container-slider">
      {category?.img.map((obj, index) => {
        return (
          <div
            key={obj}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img src={category?.img[index]} />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: category?.img.length }).map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
            ></div>
          );
        })}
      </div>
      <NavLink to={`/home?gender=${gender}`} style={{ textDecoration: "none" }}>
        <button className="btn-show-more">Show more!</button>
      </NavLink>
    </div>
  );
}
