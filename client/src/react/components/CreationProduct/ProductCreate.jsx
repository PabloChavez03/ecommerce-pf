import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { postProduct } from "../../../redux/actions-types";

// const validateImg = (urlImg) => {
//   const regex = /.*\.(gif|jpe?g|bmp|png)$/gim;
//   return regex.test(urlImg);
// };
// const deepHouseMatute = () => {
//     return parseInt(Math.random() + Date.now())
// }

function validate(input) {
  let errors = {};
  // errors.button = false;

  if (!input.name || input.name === "") {
    errors.name = <i>"Debe ingresar un nombre del producto!"</i>;
    // errors.button = true;
  }
  if (!input.description || input.description === "") {
    errors.description = <i>"Debe ingresar una description del producto!"</i>;
    // errors.button = true;
  }
  if (!input.images.length || input.images === "") {
    errors.images = <i>"Debe ingresar una imagen producto!"</i>;
    // errors.button = true;
  }
  if (!input.previousPrice || input.previousPrice < 0) {
    errors.previousPrice = <i>"Debe ingresar un importe valido!"</i>;
    // errors.button = true;
  }
  if (!input.currentPrice || input.currentPrice < 0) {
    errors.currentPrice = <i>"Debe ingresar un importe valido!"</i>;
    // errors.button = true;
  }
  if (!input.colour || input.colour === "") {
    errors.colour = <i>"Debe ingresar un color de prenda!"</i>;
    // errors.button = true;
  }
  if (!input.gender || input.gender === "") {
    errors.gender = <i>"Debe ingresar un genero!"</i>;
    // errors.button = true;
  }
  if (!input.brand || input.brand === "") {
    errors.brand = <i>"Debe ingresar una marca!"</i>;
    // errors.button = true;
  }
  if (!input.category || input.category === "") {
    errors.category = <i>"Debe ingresar una marca!"</i>;
    // errors.button = true;
  }
  return errors;
}

export default function ProductCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setError] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    images: [],
    previousPrice: 0,
    isOffertPrice: false,
    currentPrice: 0,
    colour: "",
    gender: "",
    brand: "",
    isOffertProduct: false,
    category: "",
    info: {
      aboutMe: "",
      sizeAndFit: "",
      careInfo: "",
    },
    variants: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

    const handleSelectOnChange = (e) => {
      const value = e.target.value;
      e.preventDefault();
      setInput((prev) => ({
        ...prev,
        images: [...input.images, value],
      }));

      //set Error a revisar

      setError(
        validate({
          ...input,
          images: [...input.images, value],
        })
      );
    };


  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postProduct({...input, category: 6455}));
    setInput({
      name: "",
      description: "",
      images: [],
      previousPrice: 0,
      isOffertPrice: false,
      currentPrice: 0,
      brandName: "",
      colour: "",
      gender: "",
      info: {
        aboutMe: "",
        sizeAndFit: "",
        careInfo: "",
      },
      variants: [],
    });
    navigate("/home");
    alert('Producto creado con exito!')
    console.log(input)
  }

  function handleCheck(e) {
    setInput({
      ...input,
      [e.target.name]: !input.isOffertPrice,
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Ingrese el nombre!!"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            placeholder="Ingrese descripcion!!"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label>Images: </label>
          <input
            type="text"
            placeholder="Ingrese imagen!!"
            name="images"
            value={input.images}
            onChange={(e) => handleSelectOnChange(e)}
          />
          {errors.images && <p>{errors.images}</p>}
        </div>

        <div>
          <label>Previous Price: </label>
          <input
            type="number"
            placeholder="Ingrese precio!!"
            name="previousPrice"
            value={input.previousPrice}
            onChange={(e) => handleChange(e)}
          />
          {errors.previousPrice && <p>{errors.previousPrice}</p>}
        </div>

        <div>
          <label>isOffertPrice: </label>
          <input
            type="checkbox"
            name="isOffertPrice"
            value={input.isOffertPrice}
            onChange={(e) => handleCheck(e)}
          />
        </div>

        <div>
          <label>Current Price: </label>
          <input
            type="number"
            placeholder="Ingrese precio!!"
            name="currentPrice"
            value={input.currentPrice}
            onChange={(e) => handleChange(e)}
          />
          {errors.currentPrice && <p>{errors.currentPrice}</p>}
        </div>

        <div>
          <label>Brand Name: </label>
          <input
            type="text"
            placeholder="Ingrese marca!!"
            name="brand"
            value={input.brand}
            onChange={(e) => handleChange(e)}
          />
          {errors.brand && <p>{errors.brand}</p>}
        </div>

        <div>
          <label>Colour: </label>
          <input
            type="text"
            placeholder="Ingrese color!!"
            name="colour"
            value={input.colour}
            onChange={(e) => handleChange(e)}
          />
          {errors.colour && <p>{errors.colour}</p>}
        </div>

        <div>
          <label>gender: </label>
          <select
            type="text"
            placeholder="Ingrese fenero!!"
            name="gender"
            value={input.gender}
            onChange={(e) => handleChange(e)}
          >
            <option>Seleccionar</option>
            <option value={"men"}>Men</option>
            <option value={"women"}>Women</option>
          </select>
        </div>

        <fieldset>
          <legend>info</legend>

          <label for="name">About Me:</label>
          <input
            type="text"
            name="aboutMe"
            value={input.info.aboutMe}
            onChange={(e) => handleChange(e)}
          />

          <label for="sizeAndFit">Size And Fit</label>
          <input
            type="text"
            name="sizeAndFit"
            value={input.info.sizeAndFit}
            onChange={(e) => handleChange(e)}
          />

          <label for="sizeAndFit">Size And Fit:</label>
          <input
            type="text"
            name="careInfo"
            value={input.info.sizeAndFit}
            onChange={(e) => handleChange(e)}
          />
        </fieldset>

        <div>
          <label>variants: </label>
          <input
            type="checkbox"
            placeholder="Ingrese el nombre!!"
            name="variants"
            value={input.variants}
          />
        </div>

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}
