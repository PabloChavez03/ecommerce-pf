import React from 'react'
import FilterByCategory from './FilterByCategory/FilterByCategory'
import FiltersByMark from './FiltersByMark/FiltersByMark'
import OrderByPrice from './OrderByPrice/OrderByPrice'

function Filter({ setRender, setCurrentPage }) {

  return (
    <div>

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