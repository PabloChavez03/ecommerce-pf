import React, { useState } from "react";
import {useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function CreationProduct() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        description: "",
        image: "",
        colors: [],
        size: "",
        listprice: "",
        promotion_msg: "",
        originalprice: "",
        promotionprice: "",
        ispromotion: false,
        categories: [],
        types: []
    });
    
    const colores = ["Blanco", "Negro", "Violeta", "Naranja"];
    const categorias = [
        "Women",
        "Plus + Curve",
        "Accessories",
        "Swim",
        "Activewear",
        "Men",
        "Girls",
        "Collections",
        "Sale"
    ];
    const tipos = ["Remeras", "Pantalones", "Gafas", "Medias"];

    const handleChangeInput = (event) => {
        event.preventDefault();
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleSelectPromotion = (event) => {
        event.preventDefault();
        if(event.target.value !== "Seleccionar") {
            let promotion = event.target.value === "true" ? true : false;
            setData({
                ...data,
                ispromotion: promotion,
                promotion_msg: "",
                promotionprice: ""
            });
        };
    };

    const handleChangeSelect = (event) => {
        event.preventDefault();
        setData({
            ...data,
            [event.target.name]: [...data[event.target.name], event.target.value]
        });
    };

    const handleClickDelete = (event) => {
        event.preventDefault();
        setData({
            ...data,
            [event.target.name]: data[event.target.name].filter((el) => el.toLowerCase() !== event.target.value.toLowerCase())
        });
    };

    const handleReset = (event) => {
        event.preventDefault();
        setData({name: "",
        description: "",
        image: "",
        colors: [],
        size: "",
        listprice: "",
        promotion_msg: "",
        originalprice: "",
        promotionprice: "",
        ispromotion: "",
        categories: [],
        types: []});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Producto agregado correctamente 😁");
        setData({name: "",
        description: "",
        image: "",
        colors: [],
        size: "",
        listprice: "",
        promotion_msg: "",
        originalprice: "",
        promotionprice: "",
        ispromotion: false,
        categories: [],
        types: []});
        navigate("/")
    };

    return(
        <div>
            <form>
                <h2>Creación de nuevo producto</h2>
                <div>
                    <label>Nombre</label>
                    <input type="text" placeholder="Nombre de producto" name={"name"} value={data.name} onChange={(e)=>handleChangeInput(e)}/>
                </div>
                <div>
                    <label>Descripción</label>
                    <input type="text" placeholder="Descripción del producto" name={"description"} value={data.description} onChange={(e)=>handleChangeInput(e)}/>
                </div>
                <div>
                    <label>Image</label>
                    <input type="text" placeholder="Imagen del producto" name={"image"} value={data.image} onChange={(e)=>handleChangeInput(e)}/>
                </div>
                <div>
                    <label>Talle</label>
                    <input type="number" placeholder="Talle del producto" name={"size"} value={data.size} onChange={(e)=>handleChangeInput(e)}/>
                </div>
                <div>
                    <label>Color</label>
                    <select name={"colors"} onChange={(e)=>handleChangeSelect(e)}>
                    <option value={"Seleccionar"}>Seleccionar</option>
                    {
                        colores.length ? colores.map((color) => (
                            <option name={"colors"} value={color} >{color}</option>
                        )): null
                    }
                    </select>
                </div>
                <div>
                    
                    <ul>
                    {
                        data.colors.length?data.colors.map((element) => (
                            <div>
                            <h4>Colores seleccionados:</h4>
                            <li>{element}</li>
                            <button name={"colors"} value={element} onClick={(e)=>handleClickDelete(e)}>X</button>
                            </div>
                        )) : null
                    }
                    </ul>
                </div>
                <div>
                    <label>Precio de lista</label>
                    <input type="number" placeholder="Precio de lista" name={"listprice"} value={data.listprice} onChange={(e)=>handleChangeInput(e)}/>
                </div>
                <div>
                    <label>Precio Original</label>
                    <input type="number" placeholder="Precio Original" name={"originalprice"} value={data.originalprice} onChange={(e)=>handleChangeInput(e)}/>
                </div>
                <div>
                    <label>Es promoción?</label>
                    <select name={"ispromotion"} onChange={(e)=>handleSelectPromotion(e)}>
                        <option value={"Seleccionar"}>Seleccionar</option>
                        <option value={true} name={"ispromotion"}>Si</option>
                        <option value={false} name={"ispromotion"}>No</option>
                    </select>
                </div>
                {
                    data.ispromotion === true?
                <div>
                    <div>
                        <label>Precio de promoción</label>
                        <input type="number" placeholder="Precio de promoción" name={"promotionprice"} value={data.promotionprice} onChange={(e)=>handleChangeInput(e)}/>
                    </div>
                    <div>
                        <label>Mensaje de promoción</label>
                        <input type="text" placeholder="Mensaje de promoción" name={"promotion_msg"} value={data.promotion_msg} onChange={(e)=>handleChangeInput(e)}/>
                    </div>
                </div> : null
                }
                <div>
                    <label>Categorias</label>
                    <select name={"categories"} onChange={(e)=>handleChangeSelect(e)}>
                    <option value={"Seleccionar"}>Seleccionar</option>
                    {
                        categorias.length ? categorias.map((category) => (
                            <option name={"categories"} value={category} >{category}</option>
                        )): null
                    }
                    </select>
                </div>
                <div>
                    <ul>
                    {
                        data.categories.length?data.categories.map((element) => (
                            <div>
                            <h4>Categorias seleccionadas:</h4>
                            <li>{element}</li>
                            <button name={"categories"} value={element} onClick={(e)=>handleClickDelete(e)}>X</button>
                            </div>
                        )) : null
                    }
                    </ul>
                </div>
                <div>
                    <label>Tipos de prendas:</label>
                    <select name={"types"} onChange={(e)=>handleChangeSelect(e)}>
                    <option value={"Seleccionar"}>Seleccionar</option>
                    {
                        tipos.length ? tipos.map((type) => (
                            <option name={"types"} value={type} >{type}</option>
                        )): null
                    }
                    </select>
                </div>
                <div>
                    <ul>
                    {
                        data.types.length?data.types.map((element) => (
                            <div>
                            <h4>Tipos de prendas seleccionados:</h4>
                            <li>{element}</li>
                            <button name={"types"} value={element} onClick={(e)=>handleClickDelete(e)}>X</button>
                            </div>
                        )) : null
                    }
                    </ul>
                </div>
                <div>
                    <button onClick={(e)=>handleSubmit(e)} type="submit">Enviar</button>
                </div>
                <div>
                    <button onClick={(e)=>handleReset(e)} type="submit">Resetear formulario</button>
                </div>
            </form>
        </div>
    );
};