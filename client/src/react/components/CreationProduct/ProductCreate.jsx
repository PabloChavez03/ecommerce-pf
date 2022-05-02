import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCategories, postProduct } from "../../../redux/actions-types";

import s from "./ProductCreate.module.css";

// Components
import AddImages from "./components/AddImages";
import { handleDeleteImg } from "./handlers";

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

  if (!input.images.length) {
    errors.images = <i>"Debe agregar al menos una imagen producto!"</i>;
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
  if (!input.brandName || input.brandName === "") {
    errors.brandName = <i>"Debe ingresar una marca!"</i>;
    // errors.button = true;
  }
  if (!input.category.length) {
    errors.category = <i>"Debe ingresar una marca!"</i>;
    // errors.button = true;
  }
  return errors;
}

export default function ProductCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [canAddImage, setCanAddImage] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

	//Categorias para devolver keys
  let categories = useSelector((state) => state.allCategories);

  const initialState = {
    name: "",
    description: "",
    images: [],
    previousPrice: 0,
    isOffertPrice: false,
    currentPrice: 0,
    colour: "",
    gender: "",
    brandName: "",
    isOffertProduct: false,
    category: [],
    info: {
      aboutMe: "",
      sizeAndFit: "",
      careInfo: "",
    },
    variants: [],
  };

  const [errors, setError] = useState({});
  const [input, setInput] = useState(initialState);
  let demoCategories = [];
  demoCategories = categories.filter((el) => input.category.includes(el.id));
  // console.log(demoCategories)

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

  function handleSelectCategoryOnChange(e) {
    const value = e.target.value;
    e.preventDefault();
    setInput((prev) => ({
      ...prev,
      category: [...input.category, Number(value)],
    }));
    // console.log(value)

    //set Error a revisar

    setError(
      validate({
        ...input,
        category: [...input.category, Number(value)],
      })
    );
  }

	 function handleImageOnChange(e) {
     const value = e.target.value;
     e.preventDefault();
     setInput((prev) => ({
       ...prev,
       images: [...input.images, value],
     }));
     // console.log(value)

     //set Error a revisar

     setError(
       validate({
         ...input,
         images: [...input.images,value],
       })
     );
   }

  function handleDeleteSelectCategory(e) {
    const value = e.target.value;
    e.preventDefault();
    setInput((prev) => ({
      ...prev,
      category: prev.category.filter((el) => el !== Number(value)),
    }));

    setError(
      validate({
        ...input,
        category: input.category.filter((el) => el !== Number(value)),
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postProduct({ ...input, category: 6455 }));
    navigate("/home");
    alert("Producto creado con exito!");
    console.log(input);
  }

  function handleCheck(e) {
    setInput({
      ...input,
      [e.target.name]: !input.isOffertPrice,
    });
  }

  // const handleKeyPress = (e) => {
  // 	if (e.key === "Enter") {
  // 		setInput({
  // 			...input,
  // 			category: [...input.category, e.target.value],
  // 		})
  // 		console.log(e)
  // 		console.log(input.category)
  // 	}
  // }

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
          <AddImages
            canAddImage={canAddImage}
            setCanAddImage={setCanAddImage}
            input={input}
            setInput={setInput}
            errors={errors}
            setError={setError}
            validate={validate}
          />

          {input.images.length
            ? input.images.map((el, idx) => {
                return (
                  <div key={`addedImg${idx}`}>
                    <button
                      onClick={(e) => handleDeleteImg(e, el, input, setInput)}
                    >
                      Eliminar
                    </button>
                    <img src={el} alt={`Added img number ${idx + 1}`} />
                  </div>
                );
              })
            : ""}
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
            name="brandName"
            value={input.brandName}
            onChange={(e) => handleChange(e)}
          />
          {errors.brandName && <p>{errors.brandName}</p>}
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

        <div>
          {demoCategories?.map((el) => (
            <div key={el.id}>
              <span key={el.id} value={el.id}>
                {el.title}
              </span>
              <button value={el.id} onClick={(e) => handleDeleteSelectCategory(e)}>
                x
              </button>
            </div>
          ))}
        </div>

        <div>
          <label>Categories: </label>
          <select onChange={handleSelectCategoryOnChange}>
            <optgroup value="categories" label="Categorias">
              {categories?.map((el) => (
                <option value={el.id} key={el.id} name={el.title}>
                  {el.title}
                </option>
              ))}
            </optgroup>
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

        <button
          hidden={Object.values(errors).length === 0 ? false : true}
          type="submit"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}
