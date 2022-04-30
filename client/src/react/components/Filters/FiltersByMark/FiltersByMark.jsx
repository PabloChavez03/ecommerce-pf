import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBrands, getFiltersBrands } from '../../../../redux/actions-types';

function FiltersByMark() {
    const [value, setValue] = useState('Marca');
    ///Dispatch reducer
    const dispatch = useDispatch();
    /////Reducer
    const brandsAll = useSelector(
        (state) => state.brands
    );
    useEffect(() => {
        dispatch(getCurrentBrands())
    }, [dispatch])


    function handleFilterByMark(e) {
        e.preventDefault();
        dispatch(getFiltersBrands(e.target.value))
        setValue(e.target.value)
    }
    return (
        <div>
            <select name='selectbrands' value={value} onChange={(e) => handleFilterByMark(e)}>
                <option value={'Marca'}>Marca</option>
                {brandsAll?.map(item => (<option key={item} value={item}>{item}</option>))}
            </select>
        </div>
    )
}

export default FiltersByMark;