import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { setCurrentPage } from "../../../redux/actions-types";

export default function Paginated({allProducts, productsPerPage, handleNextPage, handlePrevPage, minLimitNumberPage, maxLimitNumberPage}) {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.recipes);
    
    const numberPage = [];
    for (let i = 1; i <= Math.ceil(allProducts.length / productsPerPage); i++) {
            numberPage.push(i);
    };
    console.log(numberPage)
    const handleClickNumberPage = (event) => {
        dispatch(setCurrentPage(event.target.id));
    };

    

    // let pageIncrement = null;
    // if(numberPage.length > maxLimitNumberPage && parseInt(currentPage) !== Math.ceil(allProducts.length / productsPerPage)) {
    //     pageIncrement = <li onClick={handleNextPage}> &hellip; </li>
    // };

    // let pageDecrement = null;
    // if(numberPage.length < maxLimitNumberPage && parseInt(currentPage) !== 1) {
    //     pageDecrement = <li onClick={handlePrevPage}> &hellip; </li>
    // };

    return (
        <div>
            {
                allProducts.length && <nav>
                <ul>
                    <li>
                    <button onClick={handlePrevPage}>{"<<"}</button>
                    </li>
                    {/* {pageDecrement} */}
                    {
                            numberPage.length >= 1?numberPage.map((n,i) => {
                                console.log(n)
                                if(n < maxLimitNumberPage+1 && n > minLimitNumberPage) {
                                return <li 
                                key={n} id={n} onClick={(e)=>handleClickNumberPage(e)}>{n}
                                </li>
                            } else {
                                return null;
                            }})
                            :<p>Loading...</p>
                    }
                    {/* {pageIncrement} */}
                    <li>
                    <button 
                    onClick={handleNextPage}>{">>"}</button>
                    </li>
                </ul>
            </nav>
            }
        </div>
    )
}