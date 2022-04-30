import React from 'react'
import FiltersByMark from './FiltersByMark/FiltersByMark'
import OrderByPrice from './OrderByPrice/OrderByPrice'

function Filter({ setRender, setCurrentPage }) {

  return (
    <div>

      <OrderByPrice
        setRender={setRender}
        setCurrentPage={setCurrentPage}
      />
      <FiltersByMark />

    </div>
  )
}

export default Filter