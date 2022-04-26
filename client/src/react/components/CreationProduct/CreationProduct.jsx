import React, { useEffect, useState } from "react";
import {useDispatch } from 'react-redux';

export default function CreationProduct() {
    const dispatch = useDispatch();
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
        ispromotion: "",
        categories: [],
        tipo: []
    });

    useEffect(() => {
        dispatch()
      }, [dispatch]);
    
    const colores = ["Blanco", "Negro", "Violeta", "Naranja"];
    const categorias = ["Woman", "Man", "Children", "Gatitos"];
    const tipos = ["Remeras", "Pantalones", "Gafas", "Medias"];

    const handleChangeInput = (event) => {
        event.preventDefault();
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
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
                    <input type="text" placeholder="Imagen del producto" name={"imagen"} value={data.image} onChange={(e)=>handleChangeInput(e)}/>
                </div>
                <div>
                    <label>Talle</label>
                    <input type="number" placeholder="Talle del producto" name={"size"} value={data.size} onChange={(e)=>handleChangeInput(e)}/>
                </div>
                <div>
                    <label>Color</label>
                    <select onChange={(e)=>handleChangeSelect(e)}>
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
                            <li>{element}</li>
                            <button onClick={(e)=>handleClickDelete(e)}>X</button>
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
                    <select onChange={(e)=>handleChangeInput(e)}>
                        <option value={"Si"} name={"ispromotion"}>Si</option>
                        <option value={"No"} name={"ispromotion"}>No</option>
                    </select>
                </div>
                {
                    data.ispromotion === "Si"?
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

                </div>
            </form>
        </div>
    )
}