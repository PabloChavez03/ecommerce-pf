import React from "react";
import { NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";



export default function ProductCreate () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name:"",
        description: "",
        images: [],
        previousPrice: 0,
        isOffertPrice: false,
        currentPrice: 0,
        brandName: "",
        colour: "",
        gender: "",
        brand: "",
        isOffertProduct: false,
        category: "",
        info: {
            aboutMe: "",
            sizeAndFit: "",
            careInfo: ""},
        variants: [],
    });

    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        // dispatch(djnbvfjsdbvj(input));
        setInput({
            name:"",
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
                careInfo: ""},
             variants: [],
        })
        navigate("home")
    };

    function handleCheck (e){
            setInput({
            ...input,
            [e.target.name]: !input.isOffertPrice
          });
      };


    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type="text" placeholder="Ingrese el nombre!!" name={"name"} value={input.name} onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>Description: </label>
                    <input type="text" placeholder="Ingrese descripcion!!" name={"description"} value={input.description} onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>Images: </label>
                    <input type="text" placeholder="Ingrese imagen!!" name={"images"} value={input.images} onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>Previous Price: </label>
                    <input type="number" placeholder="Ingrese precio!!" name={"previousPrice"} value={input.previousPrice} onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>isOffertPrice: </label>
                    <input type="checkbox" name={"isOffertPrice"} value={input.isOffertPrice} onChange={(e)=>handleCheck(e)}/>
                </div>

                <div>
                    <label>Current Price: </label>
                    <input type="number" placeholder="Ingrese precio!!" name={"currentPrice"} value={input.currentPrice} onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>Brand Name: </label>
                    <input type="text" placeholder="Ingrese marca!!" name={"brandName"} value={input.brandName} onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>Colour: </label>
                    <input type="text" placeholder="Ingrese color!!" name={"colour"} value={input.colour} onChange={(e)=>handleChange(e)}/>
                </div>

                <div>
                    <label>Gender: </label>
                    <select type="text" placeholder="Ingrese fenero!!" name={"gender"} value={input.gender} onChange={(e)=>handleChange(e)}>
                    <option >Seleccionar</option>
                    <option value={"men"}>Men</option>
                    <option value={"women"}>Women</option>
                    </select>
                </div>

                <fieldset >
                     <legend>info</legend>

                     <label for="name">About Me:</label>
                     <input type="text" name="aboutMe" value={input.info.aboutMe} onChange={(e)=>handleChange(e)}/>

                     <label for="sizeAndFit">Size And Fit</label>
                     <input type="text"  name="sizeAndFit" value={input.info.sizeAndFit} onChange={(e)=>handleChange(e)}/>

                     <label for="sizeAndFit">Size And Fit:</label>
                     <input type="text" name="careInfo" value={input.info.sizeAndFit} onChange={(e)=>handleChange(e)}/>
              </fieldset>
           
                <div>
                    <label>variants: </label>
                    <input type="checkbox" placeholder="Ingrese el nombre!!" name={"variants"} value={input.variants}/>
                </div>
            </form>
        </div>
    )
};

