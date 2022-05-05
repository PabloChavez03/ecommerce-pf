import React, { useState } from 'react'
import css from './AccountMenu.module.css'
import AccountIcon from "../../svg/AccountIcon";
import CartIcon from "../../svg/CartIcon";
import CreateIcon from "../../svg/CreateIcon";
import Modal from "../../ShoppingCart/Modal/Modal";
import { NavLink } from 'react-router-dom';
function AccountMenu() {
    const[active , setActive] = useState(false);
    const showDropDown = (e)=>{
        e.preventDefault()
        if(active){setActive(false)}else{
            setActive(true)
        }
        
    }
   
    const [statusModal, setStatusModal] = useState(false);


    const handleModalStatus = (e) => {
      e.preventDefault();
      setStatusModal(true);
    };
  
  return (
    <div>
        <div className={css.dropdown}>
            <div className={css.Menu}  >
            <NavLink to={"/admin"}>
            <CreateIcon />
          </NavLink>

          <div className="icon_cart" onClick={(e) => handleModalStatus(e)}>
            <CartIcon />
          </div>
                <div onClick={(e)=>showDropDown(e)}><AccountIcon /></div>
                <Modal status={statusModal} setStatus={setStatusModal} />
          

                
                {active?(
                <div className={css.dropList}>
                    <p className={css.item}>hola</p>
                    <p className={css.itemDos}>como</p>
                    
                </div>):null}
            </div>
           
        </div>
    </div>
  )
}

export default AccountMenu