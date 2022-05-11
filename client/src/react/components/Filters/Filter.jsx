import React, { useState } from 'react'
import FilterByCategory from './FilterByCategory/FilterByCategory'
import FiltersByMark from './FiltersByMark/FiltersByMark'
import OrderByPrice from './OrderByPrice/OrderByPrice'
import css from './Filter.module.css'

function Filter({ setRender, setCurrentPage, selectFilter, setSelectFilter,productsCurent }) {
  
  return (
    <div className={css.container}>

      <OrderByPrice
        setRender={setRender}
        setCurrentPage={setCurrentPage}
        selectFilter={selectFilter}
				setSelectFilter={setSelectFilter}
        productsCurent={productsCurent}
      />
      <FilterByCategory
      selectFilter={selectFilter}
      setSelectFilter={setSelectFilter}
      setCurrentPage={setCurrentPage}
      />
      <FiltersByMark
        setCurrentPage={setCurrentPage}
        selectFilter={selectFilter}
				setSelectFilter={setSelectFilter}
      />
      
    </div>
  )
}

export default Filter