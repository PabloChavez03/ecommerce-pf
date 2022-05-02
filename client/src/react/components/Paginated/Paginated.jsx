import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { setCurrentPage } from "../../../redux/actions-types";
import style from "./Paginated.module.css";
import prev from "./images/left.png";
import next from "./images/arrow-right.png";

export default function Paginated({productsToPaginated, productsPerPage}) {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.currentPage);
    const [limitNumberPage] = useState(5);
    const [maxLimitNumberPage, setmaxLimitNumberPage] = useState(5);
    const [minLimitNumberPage, setminLimitNumberPage] = useState(0);
    const numberPage = [];

    for (let i = 1; i <= Math.ceil(productsToPaginated.length / productsPerPage); i++) {
            numberPage.push(i);
    };

    const handleClickNumberPage = (event) => {
        dispatch(setCurrentPage(parseInt(event.target.id)));
    };

    const handleNextPage = (event) => {
        event.preventDefault();
        if((currentPage+1) !== Math.ceil(productsToPaginated.length / productsPerPage)) {
            dispatch(setCurrentPage(parseInt(currentPage + 1)))
            if(currentPage + 1 > maxLimitNumberPage) {
                setmaxLimitNumberPage(maxLimitNumberPage + limitNumberPage);
                setminLimitNumberPage(minLimitNumberPage + limitNumberPage);
            };   
        };
    };

    const handlePrevPage = (event) => {
        event.preventDefault();
        if((currentPage-1) !== 0 ) {
            dispatch(setCurrentPage(parseInt(currentPage - 1)))
            if(parseInt((currentPage - 1) % limitNumberPage) === 0) {
                setmaxLimitNumberPage(maxLimitNumberPage - limitNumberPage);
                setminLimitNumberPage(minLimitNumberPage - limitNumberPage);
            };    
        };              
      };

    return (
        <div>
            {
                productsToPaginated.length && <nav>
                <ul className={style.numberPage}>
                    <img className={style.imgPrev} src={prev} alt="Previous" onClick={(e)=>handlePrevPage(e)}/>
                    {/* <button onClick={handlePrevPage} disabled={parseInt(currentPage) === 1 ? true : false}>{"<<"} </button> */}
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
                    <img className={style.imgNext} src={next} alt="Previous" onClick={(e)=>handleNextPage(e)}/>
                    {/* <button 
                    onClick={handleNextPage}
                    disabled={parseInt(currentPage) === Math.ceil(productsToPaginated.length / productsPerPage) ? true : false}>{">>"}</button> */}
                </ul>
            </nav>
            }
        </div>
    );
};