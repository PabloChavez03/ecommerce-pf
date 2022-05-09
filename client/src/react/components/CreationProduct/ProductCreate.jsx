import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getAllCategoriesForForm,
  postProduct,
  setChangeFormCreate,
} from "../../../redux/actions-types";

// Components
import AddImages from "./components/AddImages";
import AddInfo from "./components/AddInfo";
import AddVariants from "./components/AddVariants";

// Utils
import s from "./ProductCreate.module.css";
import { handleDeleteImg, handleSizeDelete } from "./handlers";

function validate(input) {
  let errors = {};
  let lettersVal = /^[a-zA-Z\s]*$/;
  let nameVal = /^[.a-zA-Z0-9,!? ;:"áéíóúñÑ*+-]*$/;

  if (!input.name || input.name === "" || nameVal.test(input.name) === false) {
    errors.name = <i>"Debe ingresar un nombre válido para el producto"</i>;
  }
  if (
    !input.description ||
    input.description === "" ||
    nameVal.test(input.description) === false
  ) {
    errors.description = <i>"Debe ingresar una description del producto"</i>;
  }

  if (!input.images.length) {
    errors.images = <i>"Debe agregar al menos una imagen producto"</i>;
  }

  if (!input.currentPrice || input.currentPrice < 0 || isNaN(Number(input.currentPrice))) {
    errors.currentPrice = <i>"Debe ingresar un importe valido"</i>;
  }
  if (
    !input.color ||
    input.color === "" ||
    lettersVal.test(input.color) === false
  ) {
    errors.color = <i>"Debe ingresar un color de prenda valido"</i>;
  }
  if (!input.gender || input.gender === "") {
    errors.gender = <i>"Debe ingresar un genero"</i>;
  }
  if (!input.brandName || input.brandName === "") {
    errors.brandName = <i>"Debe ingresar una marca"</i>;
  }
  if (!input.category || input.category === "") {
    errors.category = <i>"Debe ingresar una marca"</i>;
  }
  return errors;
}

export default function ProductCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [canAddImage, setCanAddImage] = useState(false);

  const { token } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(getAllCategoriesForForm());
  }, [dispatch]);

  //Categorias para devolver keys
  let categories = useSelector((state) => state.categoriesForForm);

  const initialState = useSelector((state) => state.productCreate);
  
  const [correct, setCorrect] = useState(false);
  const [input, setInput] = useState(initialState);
  const [errors, setError] = useState(initialState);
  const [nameCategory, setNameCategory] = useState("");

//   useEffect(() => {setCorrect(false)}, [initialState]);
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
    dispatch(setChangeFormCreate(input));
  }

  function handleSelectCategoryOnChange(e) {
    const value = e.target.value;
    e.preventDefault();
	if(value !== "seleccionar") {
		setInput((prev) => ({
			...prev,
			category: Number(value),
		  }));
		  setError(
			validate({
			  ...input,
			  category: Number(value),
			})
		  );
		  let categoryName = categories.find((e) => e.id === Number(value));
		  setNameCategory(categoryName.title);
	}
  }

  function handleDeleteSelectCategory(e) {
    e.preventDefault();
    setInput((prev) => ({
      ...prev,
      category: "",
    }));

    setError(
      validate({
        ...input,
        category: "",
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCorrect(true);
    if (Object.values(errors).length !== 0) {
      alert("Faltan campos que rellenar");
    } else {
      dispatch(postProduct(input, token));
      dispatch(
        setChangeFormCreate({
          name: "",
          description: "",
          images: [],
          previousPrice: "",
          isOffertPrice: false,
          currentPrice: "",
          color: "",
          gender: "",
          brandName: "",
          category: "",
          info: {
            aboutMe: "",
            sizeAndFit: "",
            careInfo: "",
          },
          variants: [],
        })
      );
	  setInput({
        name: "",
        description: "",
        images: [],
        previousPrice: "",
        isOffertPrice: false,
        currentPrice: "",
        color: "",
        gender: "",
        brandName: "",
        category: "",
        info: {
          aboutMe: "",
          sizeAndFit: "",
          careInfo: "",
        },
        variants: [],
      })
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

  const handleChangeInfoAditional = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      info: {
        ...input.info,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleClickReset = (e) => {
    e.preventDefault();
    dispatch(
      setChangeFormCreate({
        name: "",
        description: "",
        images: [],
        previousPrice: "",
        isOffertPrice: false,
        currentPrice: "",
        color: "",
        gender: "",
        brandName: "",
        category: "",
        info: {
          aboutMe: "",
          sizeAndFit: "",
          careInfo: "",
        },
        variants: [],
      })
    );
	setInput({
        name: "",
        description: "",
        images: [],
        previousPrice: "",
        isOffertPrice: false,
        currentPrice: "",
        color: "",
        gender: "",
        brandName: "",
        category: "",
        info: {
          aboutMe: "",
          sizeAndFit: "",
          careInfo: "",
        },
        variants: [],
      })
  };
  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.sectionOne}>
          <div className={s.name}>
            <label>Nombre: </label>
            <input
              className={s.input}
              type="text"
              placeholder="Ingrese nombre"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && input.name !== "" ? <p>{errors.name}</p> : ""}
          </div>

          <div className={s.description}>
            <label>Descripción: </label>
            <textarea
              className={s.input}
              type="text"
              placeholder="Ingrese descripción"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {errors.description && <p>{errors.description}</p>}
          </div>
        </div>

        <div className={s.sectionTwo}>
          <AddImages
            canAddImage={canAddImage}
            setCanAddImage={setCanAddImage}
            input={input}
            setInput={setInput}
            errors={errors}
            setError={setError}
            validate={validate}
          />

          <div className={s.imageContainerGlobal}>
            {input.images.length
              ? input.images.map((el, idx) => {
                  return (
                    <div key={`addedImg${idx}`} className={s.imageContainer}>
                      <button
                        className={s.button}
                        onClick={(e) => handleDeleteImg(e, el, input, setInput)}
                      >
                        Eliminar
                      </button>
                      <img
                        className={s.imagen}
                        src={`https://${el}`}
                        alt={`Added img number ${idx + 1}`}
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>

        <div className={s.sectionThree}>
          <div>
            <label>El producto se encuentra en oferta? </label>
            <input
              className={s.offertProduct}
              type="checkbox"
              name="isOffertPrice"
              value={input.isOffertPrice}
              onChange={(e) => handleCheck(e)}
            />
          </div>

          {input.isOffertPrice && (
            <div>
              <label>Precio anterior: </label>
              <input
                className={s.input}
                type="number"
                placeholder="Ingrese precio anterior"
                name="previousPrice"
                value={input.previousPrice}
                onChange={(e) => handleChange(e)}
              />
              {errors.previousPrice && <p>{errors.previousPrice}</p>}
            </div>
          )}

          <div>
            <label>Precio actual: </label>
            <input
              className={s.input}
              type="number"
              placeholder="Ingrese precio"
              name="currentPrice"
              value={input.currentPrice}
              onChange={(e) => handleChange(e)}
            />
            {errors.currentPrice && <p>{errors.currentPrice}</p>}
          </div>
        </div>

        <div className={s.sectionFour}>
          <div>
            <label>Marca: </label>
            <input
              className={s.input}
              type="text"
              placeholder="Ingrese marca"
              name="brandName"
              value={input.brandName}
              onChange={(e) => handleChange(e)}
            />
            {errors.brandName && <p>{errors.brandName}</p>}
          </div>

          <div>
            <label>Color: </label>
            <input
              className={s.input}
              type="text"
              placeholder="Ingrese color"
              name="color"
              value={input.color}
              onChange={(e) => handleChange(e)}
            />
            {errors.color && <p>{errors.color}</p>}
          </div>

          <div>
            <label>Género: </label>
            <select
              className={s.input}
              type="text"
              placeholder="Ingrese género"
              name="gender"
              value={input.gender}
              onChange={(e) => handleChange(e)}
            >
              <option>Seleccionar</option>
              <option value={"men"}>Hombre</option>
              <option value={"women"}>Mujer</option>
            </select>
            <h5>
              Género seleccionado:{" "}
              {input.gender === ""
                ? "Seleccionar género"
                : input.gender === "women"
                ? "Mujer"
                : "Hombre"}
            </h5>
          </div>
        </div>
        <div className={s.sectionFive}>
          <label>Categories: </label>
          <select className={s.input} onChange={handleSelectCategoryOnChange}>
			<option value="seleccionar">Seleccionar categoría</option>
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
          <div className={s.categoriesContainerGeneral}>
            {input.category !== "" ? (
              <div className={s.categoriesContainer}>
                <span value={input.category} className={s.spanCategory}>
                  {nameCategory}
                </span>
                <button
                  className={s.buttonCategory}
                  value={input.category}
                  onClick={(e) => handleDeleteSelectCategory(e)}
                >
                  x
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={s.sectionSix}>
          <div>
            <AddInfo
              input={input}
              setInput={setInput}
              errors={errors}
              setError={setError}
              validate={validate}
            />

            <fieldset className={s.showInfo}>
              <legend>Información adicional actual: </legend>
              {(input.info.aboutMe ||
                input.info.sizeAndFit ||
                input.info.careInfo) && (
                <div>
                  <label>About Me:</label>
                  <input
                    type="text"
                    value={input.info.aboutMe}
                    name="aboutMe"
                    className={s.input}
                    onChange={(e) => handleChangeInfoAditional(e)}
                  ></input>
                  <br />
                  <label>Size and Fit:</label>
                  <input
                    type="text"
                    value={input.info.sizeAndFit}
                    name="sizeAndFit"
                    className={s.input}
                    onChange={(e) => handleChangeInfoAditional(e)}
                  ></input>
                  <br />
                  <label>Care info:</label>
                  <input
                    type="text"
                    value={input.info.careInfo}
                    name="careInfo"
                    className={s.input}
                    onChange={(e) => handleChangeInfoAditional(e)}
                  ></input>
                </div>
              )}
            </fieldset>
          </div>

          <div>
            <AddVariants input={input} setInput={setInput} />
            {input.variants.length ? (
              <fieldset className={s.showInfo}>
                <legend>Variantes: </legend>
                {input.variants.map((el, idx) => {
                  return (
                    <div
                      key={`${el.brandSize}${idx}`}
                      className={s.eachVariant}
                    >
                      <p>{`Talle: ${el.brandSize} Stock: ${el.stock}`}</p>
                      <button
                        className={s.buttonCategory}
                        onClick={(e) =>
                          handleSizeDelete(e, el, input, setInput)
                        }
                      >
                        x
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
            type="submit"
            className={
              Object.values(errors).length === 0 ? s.btn : s.btnDisable
            }
          >
            Crear Producto
          </button>
          <button type="submit" className={s.btn} onClick={handleClickReset}>
            Limpiar formulario
          </button>
        </div>
      </form>
    </div>
  );
}
