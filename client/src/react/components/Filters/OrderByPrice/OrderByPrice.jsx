import React from 'react'
import { useDispatch } from 'react-redux';
import { orderByPrice } from '../../../../redux/actions-types';

function OrderByPrice({setRender, setCurrentPage}) {
    const dispatch = useDispatch();
    function handleOrderByPrice(e) {
        e.preventDefault();
        dispatch(orderByPrice(e.target.value));
        console.log(e.target.value)
        setRender(`set order by ${e.target.value}`);
        setCurrentPage(1);
      }
  return (
    <div> 
    <select onChange={(e) => handleOrderByPrice(e)}>
    <option >Orden por Precio</option>
    <option  value="high">Mayor Precio</option>
    <option  value="low">Menor Precio</option>
  </select>
  </div>
  )
}

export default OrderByPrice