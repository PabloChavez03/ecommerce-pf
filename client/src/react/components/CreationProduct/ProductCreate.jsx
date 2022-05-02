import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllCategories, postProduct } from "../../../redux/actions-types";

// Components
import AddImages from "./components/AddImages";
import AddInfo from "./components/AddInfo";
import AddVariants from "./components/AddVariants";

// Utils
import s from "./ProductCreate.module.css";
import { handleDeleteImg, handleSizeDelete } from "./handlers";

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
    dispatch(getAllCategories());
  }, [dispatch]);

  //Categorias para devolver keys
  let categories = useSelector((state) => state.categories);

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
    category: [],
    info: {
      aboutMe: "",
      sizeAndFit: "",
      careInfo: "",
    },
    variants: [],
  };

  const [input, setInput] = useState(initialState);
  const [errors, setError] = useState(initialState);
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
    if (Object.values(errors).length !== 0) {
      alert("Faltan campos que rellenar");
    } else {
      dispatch(postProduct(input));
      navigate("/");
      alert("Producto creado con exito!");
      navigate("/");
    }
  }

  function handleCheck(e) {
    setInput({
      ...input,
      [e.target.name]: !input.isOffertPrice,
    });
  }

  //para futuros keyPress
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
    <div className={s.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={s.name}>
          <label>Name: </label>
          <input
            className={s.input}
            type="text"
            placeholder="Ingrese el nombre!!"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={s.description}>
          <label>Description: </label>
          <textarea
            className={s.input}
            type="text"
            placeholder="Ingrese descripcion!!"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          ></textarea>
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
                    <img
                      src={`https://${el}`}
                      alt={`Added img number ${idx + 1}`}
                    />
                  </div>
                );
              })
            : ""}
        </div>

        <div>
          <label>isOffertPrice: </label>
          <input
            className={s.input}
            type="checkbox"
            name="isOffertPrice"
            value={input.isOffertPrice}
            onChange={(e) => handleCheck(e)}
          />
        </div>

        {input.isOffertPrice && (
          <div>
            <label>Previous Price: </label>
            <input
              className={s.input}
              type="number"
              placeholder="Ingrese precio!!"
              name="previousPrice"
              value={input.previousPrice}
              onChange={(e) => handleChange(e)}
            />
            {errors.previousPrice && <p>{errors.previousPrice}</p>}
          </div>
        )}

        <div>
          <label>Current Price: </label>
          <input
            className={s.input}
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
            className={s.input}
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
            className={s.input}
            type="text"
            placeholder="Ingrese color!!"
            name="colour"
            value={input.colour}
            onChange={(e) => handleChange(e)}
          />
          {errors.colour && <p>{errors.colour}</p>}
        </div>

        <div>
          <label>Gender: </label>
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
          <label>Categories: </label>
          <select onChange={handleSelectCategoryOnChange}>
            <optgroup value="categories" label="Man">
              {categories
                ?.filter((el) => el.genre === "men")
                .map((el) => (
                  <option value={el.id} key={el.id} name={el.title}>
                    {el.title}
                  </option>
                ))}
            </optgroup>
            <optgroup value="categories" label="Woman">
              {categories
                ?.filter((el) => el.genre === "women")
                .map((el) => (
                  <option value={el.id} key={el.id} name={el.title}>
                    {el.title}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>

        <div>
          {demoCategories?.map((el) => (
            <div key={el.id}>
              <span key={el.id} value={el.id}>
                {el.title}
              </span>
              <button
                value={el.id}
                onClick={(e) => handleDeleteSelectCategory(e)}
              >
                x
              </button>
            </div>
          ))}
        </div>

        <div>
          <AddInfo
            input={input}
            setInput={setInput}
            errors={errors}
            setError={setError}
            validate={validate}
          />

          <fieldset>
            <legend>Información adicional actual: </legend>
            {(input.info.aboutMe ||
              input.info.sizeAndFit ||
              input.info.careInfo) && (
              <div>
                <p>About me: {input.info.aboutMe}</p>
                <p>Size and Fit: {input.info.sizeAndFit}</p>
                <p>Care info: {input.info.careInfo}</p>
              </div>
            )}
          </fieldset>
        </div>

        <div>
          <AddVariants input={input} setInput={setInput} />
          {input.variants.length ? (
            <fieldset>
              <legend>Variants: </legend>
              {input.variants.map((el, idx) => {
                return (
                  <div key={`${el.brandSize}${idx}`}>
                    <p>{el.brandSize}</p>
                    <button
                      onClick={(e) => handleSizeDelete(e, el, input, setInput)}
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })}
            </fieldset>
          ) : (
            ""
          )}
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
