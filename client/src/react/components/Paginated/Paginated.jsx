import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { setCurrentPage } from "../../../redux/actions-types";
import style from "./Paginated.module.css";

export default function Paginated({allProducts, productsPerPage}) {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.currentPage);
    const [limitNumberPage] = useState(5); //limite de botones con numero de pag que quiero mostrar.
    const [maxLimitNumberPage, setmaxLimitNumberPage] = useState(5); //numero limite maximo de pagina.(la ultima) por ej si renderiza 5, la primera vez sera 5, la segunda vez sera 10 y asi sucesivamente.
    const [minLimitNumberPage, setminLimitNumberPage] = useState(0); //numero minimo de pagina. (la primera)
    const numberPage = [];
    for (let i = 1; i <= Math.ceil(allProducts.length / productsPerPage); i++) {
            numberPage.push(i);
    };
    
    const handleClickNumberPage = (event) => {
        dispatch(setCurrentPage(parseInt(event.target.id)));
    };

    const handleNextPage = () => {
        dispatch(setCurrentPage(parseInt(currentPage + 1)))
        
        if(currentPage + 1 > maxLimitNumberPage) {
            setmaxLimitNumberPage(maxLimitNumberPage + limitNumberPage);
            setminLimitNumberPage(minLimitNumberPage + limitNumberPage);
        };
    };

      const handlePrevPage = () => {
          dispatch(setCurrentPage(parseInt(currentPage - 1)))
          if(parseInt((currentPage - 1) % limitNumberPage) === 0) {
              setmaxLimitNumberPage(maxLimitNumberPage - limitNumberPage);
              setminLimitNumberPage(minLimitNumberPage - limitNumberPage);
          };
      };


    return (
        <div>
            {
                allProducts.length && <nav>
                <ul className={style.numberPage}>
                    <button onClick={handlePrevPage} disabled={parseInt(currentPage) === 1 ? true : false}>{"<<"} </button>

                    {/* {pageDecrement} */}
                    {
                            numberPage.length >= 1?numberPage.map((n,i) => {
                                
                                
                                if(n < maxLimitNumberPage+1 && n > minLimitNumberPage) {
                                return (<li className={parseInt(currentPage) === parseInt(n) ? style.active : null}
                                key={n} id={n} onClick={(e)=>handleClickNumberPage(e)}>{n}
                                </li>)
                            } else {
                                return null;
                            }})
                            :<p>Loading...</p>
                    }
                    {/* {pageIncrement} */}
                    <button 
                    onClick={handleNextPage}
                    disabled={parseInt(currentPage) === Math.ceil(allProducts.length / productsPerPage) ? true : false}>{">>"}</button>

                </ul>
            </nav>
            }
        </div>
    )
}