import React, {useState} from 'react'
import Header from '../Header';
import Footer from '../Footer/Footer';
import MenuCardBox from './MenuCardBox';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import { useMenuContext } from '../../context/MenuProvider';
import Basket from '../../commons/icons/Basket.svg';
import CartList from './CartList';


function Menu() {
  const {menuState, setMenuState} = useMenuContext();
  const togglePage = ()=>{
    if (menuState.cartTotalItems > 0){
      setMenuState({type:'togglePage'});
    }else{
      alert('Add Items to Cart to visualize it');
    }
  }


  return (
    <>
        <Header/>
        <main>
          <article id='menu'>
            <div id='menuHeaderBox'>
              <div  id='menuHeaders'>
                <h1>
                    {
                      (menuState.page==='Cart' && menuState.orderFullFilled)?
                      'Order Details':menuState.page
                    }
                </h1>
                {

                  menuState.orderFullFilled? <></>:
                  <button className='cart' onClick={()=>togglePage()}>
                    {
                      (menuState.cartTotalItems>0 && menuState.page === 'Menu')  ? 
                      <span className="count">{ menuState.cartTotalItems}</span>
                      : <></>
                    }
                    {
                      menuState.page === 'Menu'? 
                      <img src={Basket} alt='basket'></img>:
                      <FontAwesomeIcon  className='closeCart'icon={faXmark} />
                    }
                  </button>
                }
              </div>
              <hr/>
            </div>
            {
              menuState.page === 'Menu'? 
              <MenuCardBox/> :
              <CartList/>
            }
          </article>
        </main>
        <Footer/>
    </>
  )
}

export default Menu;