import React from 'react'
import FilterByCategory from './FilterByCategory/FilterByCategory'
import FiltersByMark from './FiltersByMark/FiltersByMark'
import OrderByPrice from './OrderByPrice/OrderByPrice'
import css from './Filter.module.css'

function Filter({ setRender, setCurrentPage }) {

  return (
    <div className={css.container}>

      <OrderByPrice
        setRender={setRender}
        setCurrentPage={setCurrentPage}
      />
      <FilterByCategory/>
      <FiltersByMark
        setCurrentPage={setCurrentPage}
      />
      
    </div>
  )
}

export default Filter