import React from 'react'
import OrderByPrice from './OrderByPrice/OrderByPrice'

function Filter({setRender, setCurrentPage}) {
   
  return (
    <div>
       <OrderByPrice
        setRender ={setRender}
        setCurrentPage={setCurrentPage}
       />
        
    </div>
  )
}

export default Filter