import React from 'react'
import FiltersByMark from './FiltersByMark/FiltersByMark'
import OrderByPrice from './OrderByPrice/OrderByPrice'

function Filter() {
   
  return (
    <div>
       <OrderByPrice/>
        <FiltersByMark/>
    </div>
  )
}

export default Filter