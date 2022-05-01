import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getCurrentBrands, getFiltersBrands } from '../../../../redux/actions-types';

function FiltersByMark({ setCurrentPage }) {
    const [value, setValue] = useState('Marca');
    const [params] = useSearchParams();
    const gender = params.get('gender')
    ///Dispatch reducer
    const dispatch = useDispatch();
    /////Reducer
    const brandsAll = useSelector(
        (state) => state.brands
    );
    useEffect(() => {
        dispatch(getCurrentBrands(gender))
    }, [dispatch,gender])


    function handleFilterByMark(e) {
        e.preventDefault();
        dispatch(getFiltersBrands(e.target.value))
        setCurrentPage(1)
        setValue(e.target.value)
    }
    return (
        <div>
            <select name='selectbrands' value={value} onChange={(e) => handleFilterByMark(e)}>
                <option value={'Marca'}>Seleccionar Marca</option>
                {brandsAll?.map(item => (<option key={item} value={item}>{item}</option>))}
            </select>
        </div>
    )
}

export default FiltersByMark;